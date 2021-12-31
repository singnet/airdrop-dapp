import Box from '@mui/material/Box';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React } from '../../snet-ui/Blockchain/web3Hooks';
import axios from '../../utils/Axios';
import { setShowConnectionModal } from '../../utils/store/features/walletSlice';
import { useAppDispatch, useAppSelector } from '../../utils/store/hooks';
import Airdropinfo from '../../snet-ui/Airdropinfo';
import Grid from '@mui/material/Grid';
import AirdropRegistrationMini from '../../snet-ui/AirdropRegistrationMini';
import Registrationsuccess from '../../snet-ui/Registrationsuccess';
import AirdropRegistration from '../../snet-ui/AirdropRegistration';
import { ClaimStatus, UserEligibility } from '../../utils/constants/CustomTypes';
import { API_PATHS } from '../../utils/constants/ApiPaths';
import {  WindowStatus } from '../../utils/airdropWindows';
import { useEthSign } from '../../snet-ui/Blockchain/signatureHooks';
import { parseEthersError } from '../../utils/ethereum';
import { useAirdropContract } from '../../utils/AirdropContract';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import AirdropRegistrationLoader from '../../snet-ui/AirdropRegistration/SkeletonLoader';
import { APIError } from '../../utils/errors';
import { AlertTypes } from '../../utils/constants/alert';
import { AlertColor } from '@mui/material';
import ClaimSuccess from '../../snet-ui/ClaimSuccess';
import { selectActiveWindow } from '../../utils/store/features/activeWindowSlice';

const DateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  // timeZone: "UTC",
  timeZoneName: 'short',
});

const windowStatusActionMap = {
  [WindowStatus.UPCOMING]: 'opens',
  [WindowStatus.REGISTRATION]: 'closes',
  [WindowStatus.IDLE]: 'opens',
  [WindowStatus.CLAIM]: 'claim',
};

const blockChainActionTypes = {
  CLAIM: 'claim',
  STAKE_AND_CLAIM: 'stake_and_claim',
};

interface RegistrationProps {
  userEligibility: UserEligibility;
  userRegistered: boolean;
  setUserRegistered: (value: boolean) => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  onViewNotification: () => void;
  claimStatus: ClaimStatus;
  setClaimStatus: (value: ClaimStatus) => void;
  airdropTotalTokens: { value: number; name: string };
  airdropWindowrewards: number;
}

// const airdropOpensIn = new Date();
// airdropOpensIn.setMinutes(airdropOpensIn.getMinutes() + 0);

const Registration: FunctionComponent<RegistrationProps> = ({
  userEligibility,
  userRegistered,
  setUserRegistered,
  onViewSchedule,
  onViewRules,
  onViewNotification,
  claimStatus,
  setClaimStatus,
  airdropTotalTokens,
  airdropWindowrewards,
}) => {
  const [stakeDetails, setStakeDetails] = useState<any>({ isStakable: false });
  const [windowAction, setWindowAction] = useState<string>('');
  
  const [uiAlert, setUiAlert] = useState<{ type: AlertColor; message: string }>({ type: AlertTypes.info, message: '' });


  const [airdropHistory, setAirdropHistory] = useState([]);
  const { account, library} = useActiveWeb3React();
  const ethSign = useEthSign();
  const airdropContract = useAirdropContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { window: activeWindow, totalWindows } = useAppSelector(selectActiveWindow);

  const dispatch = useAppDispatch();

  // useInterval(() => {
  //   const now = new Date();
  //   if (now.getTime() >= airdropOpensIn.getTime()) {
  //     setAirdropOpen(true);
  //   }
  // }, 500);

  useEffect(() => {
    getAlertRefresh();
    getClaimHistory();
  }, [activeWindow?.airdrop_id, activeWindow?.airdrop_window_id, account]);

  const endDate = useMemo(
    () =>
      activeWindow?.airdrop_window_status === WindowStatus.REGISTRATION
        ? new Date(`${activeWindow?.airdrop_window_registration_end_period} UTC`)
        : activeWindow?.airdrop_window_status === WindowStatus.IDLE
        ? new Date(`${activeWindow?.airdrop_window_claim_start_period} UTC`)
        : activeWindow?.airdrop_window_status === WindowStatus.CLAIM
        ? new Date(`${activeWindow?.airdrop_window_claim_end_period} UTC`)
        : new Date(),
    [activeWindow]
  );

  const getStakeDetails = async () => {
    try {
      if (!activeWindow || !account) return;
      const response: any = await axios.post(API_PATHS.STAKE_DETAILS, {
        address: account,
        airdrop_id: `${activeWindow.airdrop_id}`,
        airdrop_window_id: `${activeWindow.airdrop_window_id}`,
      });
      const stakeInfo = response.data.data.stake_details;
      const details = {
        claimableTokensToWallet: stakeInfo.claimable_tokens_to_wallet,
        isStakable: stakeInfo.is_stakable,
        stakableTokenName: stakeInfo.stakable_token_name,
        stakableTokens: stakeInfo.stakable_tokens,
      };
      setStakeDetails(details);
    } catch (error) {}
  };
  const getAlertRefresh= async () =>{
    setUiAlert({ type: AlertTypes.info, message: "" });

  };

  const handleRegistration = async () => {
    try {
      if (!account) {
        dispatch(setShowConnectionModal(true));
        return;
      }

      const signature = await ethSign.sign(
        ['uint8', 'uint8', 'address'],
        [Number(activeWindow?.airdrop_id), Number(activeWindow?.airdrop_window_id), account]
      );
      if (signature) {
        await airdropUserRegistration(account, signature);
        setUiAlert({
          type: AlertTypes.success,
          message: 'Registered successfully',
        });
        setUserRegistered(true);
      } else {
        setUiAlert({
          type: AlertTypes.error,
          message: `Failed Registration: unable to generate signature`,
        });
      }
      // router.push(`airdrop/${airdrop.airdrop_window_id}`);
    } catch (error: any) {
      setUiAlert({
        type: AlertTypes.error,
        message: `Failed Registration: ${error.message}`,
      });
    }
  };

  const getClaimHistory = async () => {
    if (!activeWindow || !account) return;
    const response: any = await axios.post(API_PATHS.AIRDROP_HISTORY, {
      address: account,
      airdrop_id: `${activeWindow.airdrop_id}`,
    });

    const history = response.data.data.claim_history.map((el) => [
      {
        label: `Vesting ${el.airdrop_window_id} Rewards`,
        value: `${Number(el.claimable_amount) / 1000000} ${airdropTotalTokens.name}`,
      },
      {
        label: `Vesting ${el.airdrop_window_id} ${el.action_type} status`,
        value: `${el.txn_status}`,
      },
    ]);

    await getStakeDetails();
    const airdropWindowAction = windowStatusActionMap[activeWindow?.airdrop_window_status ?? ''];
    setWindowAction(airdropWindowAction);
    setAirdropHistory(history.flat());
  };

  const handleAutoStake = async () => {
    if (
      typeof activeWindow?.airdrop_id === 'undefined' 
      || typeof activeWindow.airdrop_window_id === 'undefined' 
      || !account 
      || !library
    )
      return;

    if (claimStatus === ClaimStatus.PENDING) {
      setUiAlert({
        type: AlertTypes.error,
        message: 'There is already a pending claim transaction. Please wait for it to get completed',
      });
      return;
    } else if (claimStatus === ClaimStatus.SUCCESS) {
      setUiAlert({
        type: AlertTypes.error,
        message: 'You have already Claimed',
      });
      return;
    }

    const getStakeDetails = async () => {
      try {
        const response: any = await axios.post(API_PATHS.CLAIM_SIGNATURE, {
          address: account,
          airdrop_id: activeWindow.airdrop_id.toString(),
          airdrop_window_id: activeWindow.airdrop_window_id.toString(),
        });

        console.log('response', response);
        return response.data.data;
      } catch (error: any) {
        const backendErrorMessage = error?.errorText?.error?.message;
        if (backendErrorMessage) {
          throw new APIError(backendErrorMessage);
        }
        throw error;
      }
    };

    const executeStakeMethod = async (signature: string, claimAmount: number): Promise<TransactionResponse> => {
      try {
        // TODO: Don't hardcode it, use it from the API or env
        // const tokenAddress = "0xa1e841e8f770e5c9507e2f8cfd0aa6f73009715d"; // AGIX
        const tokenAddress = '0x7F44Bc93BCb96011800Da80d1a31E05e5A5AC7f9';
        const stakingAddress = '0x8C8AB2046f4A5FD93bbeEd754b3143401DA15419';
        console.log('calling autostake method');

        const txn = await airdropContract.stake(
          tokenAddress,
          stakingAddress,
          stakeDetails.stakableTokens.toString(),
          stakeDetails.claimableTokensToWallet.toString(),
          activeWindow.airdrop_id?.toString(),
          activeWindow.airdrop_window_id?.toString(),
          signature
        );
        return txn;
      } catch (error: any) {
        console.log('contract error', error);

        throw error;
      }
    };

    const saveClaimTxn = async (txnHash: string, claimAmount) => {
      const response = await axios.post(API_PATHS.CLAIM_SAVE_TXN, {
        address: account,
        txn_hash: txnHash,
        amount: claimAmount.toString(),
        airdrop_id: activeWindow?.airdrop_id?.toString(),
        airdrop_window_id: activeWindow?.airdrop_window_id?.toString(),
        blockchain_method: blockChainActionTypes.STAKE_AND_CLAIM,
      });
      console.log('response.data', response.data);
    };

    try {
      // Retreiving Claim Signature from the backend signer service
      const claimDetails = await getStakeDetails();

      // Using the claim signature and calling the Ethereum Airdrop Contract.
      const txn = await executeStakeMethod(claimDetails.signature, claimDetails.claimable_amount);

      await saveClaimTxn(txn.hash, claimDetails.claimable_amount);
      setClaimStatus(ClaimStatus.PENDING);
      const receipt = await txn.wait();
      console.log('receipt', receipt);
      if (receipt.status) {
        setUserRegistered(true);
        setClaimStatus(ClaimStatus.SUCCESS);
        setUiAlert({
          type: AlertTypes.success,
          message: 'Staked and Claimed successfully',
        });
      }
    } catch (error: any) {
      console.log('signature error', error);
      if (error instanceof APIError) {
        setUiAlert({ type: AlertTypes.error, message: error.message });
        return;
      }
      const ethersError = parseEthersError(error);
      if (ethersError) {
        setUiAlert({
          type: AlertTypes.error,
          message: `Failed Contract: ${ethersError}`,
        });
        return;
      }
      setUiAlert({
        type: AlertTypes.error,
        message: `Failed Uncaught: ${error.message}`,
      });
    }
  };

  const handleClaim = async () => {
    if (
      typeof activeWindow?.airdrop_id === 'undefined' 
      || typeof activeWindow.airdrop_window_id === 'undefined' 
      || !account 
      || !library
    )
      return;

    if (claimStatus === ClaimStatus.PENDING) {
      setUiAlert({
        type: AlertTypes.error,
        message: 'There is already a pending claim transaction. Please wait for it to get completed',
      });
      return;
    } else if (claimStatus === ClaimStatus.SUCCESS) {
      setUiAlert({
        type: AlertTypes.error,
        message: 'You have already Claimed',
      });
      return;
    }

    const getClaimDetails = async () => {
      try {
        const response: any = await axios.post(API_PATHS.CLAIM_SIGNATURE, {
          address: account,
          airdrop_id: activeWindow.airdrop_id.toString(),
          airdrop_window_id: activeWindow.airdrop_window_id.toString(),
        });

        console.log('response', response);
        return response.data.data;
      } catch (error: any) {
        const backendErrorMessage = error?.errorText?.error?.message;
        if (backendErrorMessage) {
          throw new APIError(backendErrorMessage);
        }
        throw error;
      }
    };

    const executeClaimMethod = async (signature: string, claimAmount: number): Promise<TransactionResponse> => {
      try {
      
        const tokenAddress = process.env.NEXT_PUBLIC_NTX_ADDRESS;
        console.log('calling claim method');

        const txn = await airdropContract.claim(
          tokenAddress,
          claimAmount.toString(),
          activeWindow.airdrop_id?.toString(),
          activeWindow.airdrop_window_id?.toString(),
          signature
        );
        return txn;
      } catch (error: any) {
        console.log('contract error', error);

        throw error;
      }
    };

    const saveClaimTxn = async (txnHash: string, claimAmount) => {
      const response = await axios.post(API_PATHS.CLAIM_SAVE_TXN, {
        address: account,
        txn_hash: txnHash,
        amount: claimAmount.toString(),
        airdrop_id: activeWindow?.airdrop_id?.toString(),
        airdrop_window_id: activeWindow?.airdrop_window_id?.toString(),
        blockchain_method: blockChainActionTypes.CLAIM,
      });
      console.log('response.dat', response.data);
    };

    try {
      // Retreiving Claim Signature from the backend signer service
      const claimDetails = await getClaimDetails();

      // Using the claim signature and calling the Ethereum Airdrop Contract.
      const txn = await executeClaimMethod(claimDetails.signature, claimDetails.claimable_amount);

      await saveClaimTxn(txn.hash, claimDetails.claimable_amount);
      setClaimStatus(ClaimStatus.PENDING);
      const receipt = await txn.wait();
      console.log('receipt', receipt);
      if (receipt.status) {
        setUserRegistered(true);
        setClaimStatus(ClaimStatus.SUCCESS);
        setUiAlert({
          type: AlertTypes.success,
          message: 'Claimed successfully',
        });
      }
    } catch (error: any) {
      console.log('signature error', error);
      if (error instanceof APIError) {
        setUiAlert({ type: AlertTypes.error, message: error.message });
        return;
      }
      const ethersError = parseEthersError(error);
      if (ethersError) {
        setUiAlert({
          type: AlertTypes.error,
          message: `Failed Contract: ${ethersError}`,
        });
        return;
      }
      setUiAlert({
        type: AlertTypes.error,
        message: `Failed Uncaught: ${error.message}`,
      });
    }
  };

  // REFERENCE: Working Signature code. Delete it once the new signature logic is working
  // const signTransaction = async (account: string) => {
  //   // if (!library || !account) return;

  //   // const message = solidityKeccak256(
  //   //   ["uint8", "uint8", "address"],
  //   //   [Number(airdropId), Number(airdropWindowId), account]
  //   // );

  //   // const bytesDataHash = arrayify(message);

  //   // const signer = await library.getSigner(account);
  //   // const signature = await signer.signMessage(bytesDataHash);

  //   const signature = await ethSign.sign(
  //     ["uint8", "uint8", "address"],
  //     [Number(airdropId), Number(airdropWindowId), account]
  //   );

  //   return signature;
  // };

  const airdropUserRegistration = async (address: string, signature: string) => {
    try {
      const payload = {
        signature,
        address,
        airdrop_id: activeWindow?.airdrop_id,
        airdrop_window_id: activeWindow?.airdrop_window_id,
      };
      await axios.post('airdrop/registration', payload);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const showRegistrationSuccess = useMemo(
    () => userRegistered && activeWindow?.airdrop_window_status === WindowStatus.REGISTRATION,
    [userRegistered, activeWindow]
  );
  if (!activeWindow) {
    return null;
  }

  if (!account && (activeWindow !== null || activeWindow !== undefined)) {
    return (
      <Grid container spacing={2} px={5} mt={2} mb={8}>
        <Grid item xs={12} sm={6}>
          <Airdropinfo blogLink="https://nunet-io.github.io/public/NuNet_Whitepaper_2.0.pdf" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AirdropRegistrationMini
            startDate={endDate}
            windowAction={windowAction}
            tokenName={airdropTotalTokens.name}
            totalTokens={airdropTotalTokens.value}
            totalAirdropWindows={totalWindows}
            currentAirdropWindow={activeWindow.airdrop_window_order}
            onViewNotification={onViewNotification}
          />
        </Grid>
      </Grid>
    );
  }

  if (userEligibility === UserEligibility.PENDING) {
    return (
      <Box sx={{ px: [0, 4, 15] }}>
        <AirdropRegistrationLoader />
      </Box>
    );
  }
  if (userEligibility === UserEligibility.NOT_ELIGIBLE) {
    return null;
  }

  if (!activeWindow) {
    return null;
  }

  if (claimStatus === ClaimStatus.SUCCESS && activeWindow.airdrop_window_status === WindowStatus.CLAIM) {
    return (
      <Box sx={{ px: [0, 4, 15] }}>
        <ClaimSuccess
          onViewRules={onViewRules}
          onViewSchedule={onViewSchedule}
          onViewNotification={onViewNotification}
          currentWindowId={activeWindow?.airdrop_window_order}
          totalWindows={totalWindows}
          history={airdropHistory}
        />
      </Box>
    );
  }

  const showMini =
    activeWindow.airdrop_window_status === WindowStatus.UPCOMING && activeWindow.airdrop_window_order === 1;

  console.log('show mini', showMini);

  return showRegistrationSuccess ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <Registrationsuccess
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        onViewNotification={onViewNotification}
        windowId={activeWindow.airdrop_window_order}
        totalWindows={totalWindows}
        claimStartDate={DateFormatter.format(new Date(`${activeWindow?.airdrop_window_claim_start_period ?? ''} UTC`))}
      />
    </Box>
  ) : !showMini ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <AirdropRegistration
        currentWindowId={activeWindow.airdrop_window_order}
        totalWindows={totalWindows}
        airdropWindowTotalTokens={activeWindow.airdrop_window_total_tokens}
        endDate={endDate}
        onRegister={handleRegistration}
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        history={airdropHistory}
        onClaim={handleClaim}
        onAutoStake={handleAutoStake}
        stakeInfo={stakeDetails.isStakable}
        airdropWindowStatus={activeWindow.airdrop_window_status}
        uiAlert={uiAlert}
        activeWindow={activeWindow}
        airdropWindowrewards={airdropWindowrewards}
      />
    </Box>
  ) : (
    <Grid container spacing={2} px={4} mt={2} mb={8}>
      <Grid item xs={12} sm={6}>
        <Airdropinfo blogLink="https://nunet-io.github.io/public/NuNet_Whitepaper_2.0.pdf" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AirdropRegistrationMini
          startDate={new Date(`${activeWindow.airdrop_window_registration_start_period} UTC`)}
          tokenName={airdropTotalTokens.name}
          totalTokens={airdropTotalTokens.value}
          onViewNotification={onViewNotification}
        />
      </Grid>
    </Grid>
  );
};

export default Registration;
