import Box from '@mui/material/Box';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import axios from 'utils/Axios';
import { setShowConnectionModal } from 'utils/store/features/walletSlice';
import { useAppDispatch, useAppSelector } from 'utils/store/hooks';
import Airdropinfo from 'snet-ui/Airdropinfo';
import Grid from '@mui/material/Grid';
import AirdropRegistrationMini from 'snet-ui/AirdropRegistrationMini';
import Registrationsuccess from 'snet-ui/Registrationsuccess';
import AirdropRegistration from 'snet-ui/AirdropRegistration';
import { ClaimStatus, UserEligibility } from 'utils/constants/CustomTypes';
import { API_PATHS } from 'utils/constants/ApiPaths';
import {
  WindowStatus,
  windowStatusActionMap,
  windowStatusLabelMap,
  AIRDROP_WINDOW_STRING,
  AIRDROP_PENDING_CLAIM_STRING,
  AIRDROP_LINKS,
  AIRDROP_TOKEN_DIVISOR,
} from 'utils/airdropWindows';
import { useEthSign } from 'snet-ui/Blockchain/signatureHooks';
import { parseEthersError } from 'utils/ethereum';
import { useAirdropContract } from 'utils/AirdropContract';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import AirdropRegistrationLoader from 'snet-ui/AirdropRegistration/SkeletonLoader';
import { APIError } from 'utils/errors';
import { AlertTypes } from 'utils/constants/alert';
import { AlertColor, Container } from '@mui/material';
import ClaimSuccess from 'snet-ui/ClaimSuccess';
import { selectActiveWindow } from 'utils/store/features/activeWindowSlice';
import moment from 'moment';
import { getDateInStandardFormat } from 'utils/date';

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
  const [stakeDetails, setStakeDetails] = useState<any>({ is_stakable: false });
  const [uiAlert, setUiAlert] = useState<{ type: AlertColor; message: any }>({ type: AlertTypes.info, message: '' });
  const [registrationId, setRegistrationId] = useState('');

  const [airdropHistory, setAirdropHistory] = useState([]);
  const { account, library, chainId } = useActiveWeb3React();
  const ethSign = useEthSign();
  const airdropContract = useAirdropContract();

  const { window: activeWindow, totalWindows } = useAppSelector(selectActiveWindow);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getClaimHistory();
    // Clear any previous state
    setUiAlert({ type: AlertTypes.info, message: '' });
  }, [activeWindow?.airdrop_id, activeWindow?.airdrop_window_id, account]);

  const endDate = useMemo(
    () =>
      activeWindow?.airdrop_window_status === WindowStatus.UPCOMING
        ? moment.utc(`${activeWindow?.airdrop_window_registration_start_period}`)
        : activeWindow?.airdrop_window_status === WindowStatus.REGISTRATION
        ? moment.utc(`${activeWindow?.airdrop_window_registration_end_period}`)
        : activeWindow?.airdrop_window_status === WindowStatus.IDLE
        ? moment.utc(`${activeWindow?.airdrop_window_claim_start_period}`)
        : activeWindow?.airdrop_window_status === WindowStatus.CLAIM
        ? moment.utc(`${activeWindow?.next_window_start_period}`)
        : moment.utc(),
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
      setStakeDetails(stakeInfo);
    } catch (error) {}
  };

  const handleRegistration = async () => {
    try {
      if (!account) {
        dispatch(setShowConnectionModal(true));
        return;
      }

      const [walletAddress] = (await library?.listAccounts()) as string[];

      console.log('airdrop_id', activeWindow?.airdrop_id);
      console.log('airdrop_window_id', activeWindow?.airdrop_window_id);
      console.log('account', walletAddress);

      const { signature, blockNumber } = await ethSign.sign(
        ['uint256', 'uint256', 'address'],
        [Number(activeWindow?.airdrop_id), Number(activeWindow?.airdrop_window_id), walletAddress]
      );

      console.log('signature', signature);

      if (signature) {
        await airdropUserRegistration(account, blockNumber, signature);
        setUiAlert({
          type: AlertTypes.success,
          message: 'Registered successfully',
        });
        setUserRegistered(true);
      } else {
        setUiAlert({
          type: AlertTypes.error,
          message: 'Registration Failed: Unable to generate signature',
        });
      }
      // router.push(`airdrop/${airdrop.airdrop_window_id}`);
    } catch (error: any) {
      setUiAlert({
        type: AlertTypes.error,
        message: `Registration Failed: ${error.message}`,
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
        label: `${AIRDROP_WINDOW_STRING} ${el.airdrop_window_order} Rewards`,
        value: `${Number(el.claimable_amount) / AIRDROP_TOKEN_DIVISOR} ${airdropTotalTokens.name}`,
      },
      {
        label: `${AIRDROP_WINDOW_STRING} ${el.airdrop_window_order} ${el.action_type} status`,
        value: `${el.txn_status}`,
      },
    ]);

    await getStakeDetails();
    setAirdropHistory(history.flat());
  };

  const handleAutoStake = async () => {
    if (
      typeof activeWindow?.airdrop_id === 'undefined' ||
      typeof activeWindow.airdrop_window_id === 'undefined' ||
      !account ||
      !library
    ) {
      return;
    }

    if (claimStatus === ClaimStatus.PENDING) {
      setUiAlert({
        type: AlertTypes.error,
        message: { AIRDROP_PENDING_CLAIM_STRING },
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

        return response.data.data;
      } catch (error: any) {
        const backendErrorMessage = error?.errorText?.error?.message;
        if (backendErrorMessage) {
          throw new APIError(backendErrorMessage);
        }
        throw error;
      }
    };

    const executeStakeMethod = async (
      signature: string,
      totalEligibleAmount: string,
      claimAmount: string,
      stakingAddress: string,
      tokenAddress: string,
      userWalletAddress: string,
      contractAddress: string
    ): Promise<TransactionResponse> => {
      const txn = await airdropContract.stake(
        contractAddress,
        tokenAddress,
        stakingAddress,
        stakeDetails.total_eligible_amount,
        stakeDetails.airdrop_rewards,
        stakeDetails.stakable_tokens,
        activeWindow.airdrop_id?.toString(),
        activeWindow.airdrop_window_id?.toString(),
        signature
      );
      return txn;
    };

    const saveClaimTxn = async (txnHash: string, claimAmount) => {
      await axios.post(API_PATHS.CLAIM_SAVE_TXN, {
        address: account,
        txn_hash: txnHash,
        amount: claimAmount.toString(),
        airdrop_id: activeWindow?.airdrop_id?.toString(),
        airdrop_window_id: activeWindow?.airdrop_window_id?.toString(),
        blockchain_method: blockChainActionTypes.STAKE_AND_CLAIM,
      });
    };

    try {
      // Retreiving Claim Signature from the backend signer service
      const stakeDetails = await getStakeDetails();

      // Using the claim signature and calling the Ethereum Airdrop Contract.
      const txn = await executeStakeMethod(
        stakeDetails.signature,
        stakeDetails.total_eligible_amount,
        stakeDetails.claimable_amount,
        stakeDetails.staking_contract_address,
        stakeDetails.token_address,
        stakeDetails.user_address,
        stakeDetails.contract_address
      );

      await saveClaimTxn(txn.hash, stakeDetails.claimable_amount);
      setClaimStatus(ClaimStatus.PENDING);
      const receipt = await txn.wait();
      if (receipt.status) {
        setUserRegistered(true);
        setClaimStatus(ClaimStatus.SUCCESS);
        setUiAlert({
          type: AlertTypes.success,
          message: 'Staked and Claimed successfully',
        });
      }
    } catch (error: any) {
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
      typeof activeWindow?.airdrop_id === 'undefined' ||
      typeof activeWindow.airdrop_window_id === 'undefined' ||
      !account ||
      !library
    ) {
      return;
    }

    if (claimStatus === ClaimStatus.PENDING) {
      setUiAlert({
        type: AlertTypes.error,
        message: { AIRDROP_PENDING_CLAIM_STRING },
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

        return response.data.data;
      } catch (error: any) {
        const backendErrorMessage = error?.errorText?.error?.message;
        if (backendErrorMessage) {
          throw new APIError(backendErrorMessage);
        }
        throw error;
      }
    };

    const executeClaimMethod = async (
      contractAddress: string,
      tokenAddress: string,
      signature: string,
      totalEligibleAmount: string,
      claimAmount: string
    ): Promise<TransactionResponse> => {
      const txn = await airdropContract.claim(
        contractAddress,
        tokenAddress,
        totalEligibleAmount,
        claimAmount,
        activeWindow.airdrop_id?.toString(),
        activeWindow.airdrop_window_id?.toString(),
        signature
      );
      return txn;
    };

    const saveClaimTxn = async (txnHash: string, claimAmount) => {
      await axios.post(API_PATHS.CLAIM_SAVE_TXN, {
        address: account,
        txn_hash: txnHash,
        amount: claimAmount.toString(),
        airdrop_id: activeWindow?.airdrop_id?.toString(),
        airdrop_window_id: activeWindow?.airdrop_window_id?.toString(),
        blockchain_method: blockChainActionTypes.CLAIM,
      });
    };

    try {
      // Retreiving Claim Signature from the backend signer service
      const claimDetails = await getClaimDetails();
      console.log('claimDetails', claimDetails);
      console.log('claimDetails.contract_address', claimDetails.contract_address);
      console.log('claimDetails.token_address', claimDetails.token_address);
      console.log('claimDetails.signature', claimDetails.signature);
      console.log('claimDetails.total_eligibility_amount', claimDetails.total_eligibility_amount);
      console.log('claimDetails.claimable_amount', claimDetails.claimable_amount);
      // Using the claim signature and calling the Ethereum Airdrop Contract.
      const txn = await executeClaimMethod(
        claimDetails.contract_address,
        claimDetails.token_address,
        claimDetails.signature,
        claimDetails.total_eligibility_amount,
        claimDetails.claimable_amount
      );

      await saveClaimTxn(txn.hash, claimDetails.claimable_amount);
      setClaimStatus(ClaimStatus.PENDING);
      const receipt = await txn.wait();
      if (receipt.status) {
        setUserRegistered(true);
        setClaimStatus(ClaimStatus.SUCCESS);
        setUiAlert({
          type: AlertTypes.success,
          message: 'Claimed successfully',
        });
      }
    } catch (error: any) {
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

  const airdropUserRegistration = async (address: string, blockNumber: string, signature: string) => {
    try {
      const payload = {
        signature,
        address,
        airdrop_id: activeWindow?.airdrop_id,
        airdrop_window_id: activeWindow?.airdrop_window_id,
        block_number: blockNumber,
      };
      await axios.post('airdrop/registration', payload).then((response) => {
        setRegistrationId(response.data.data);
        localStorage.setItem("registration_id", response.data.data);
      });
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

  const windowOrder =
    activeWindow.airdrop_window_status === WindowStatus.CLAIM
      ? activeWindow.airdrop_window_order + 1
      : activeWindow.airdrop_window_order;

  if (!account && (activeWindow !== null || activeWindow !== undefined)) {
    return (
      <Container>
        <Grid container spacing={2} px={5} mb={8} mt={20}>
          <Grid item xs={12} sm={6}>
            <Airdropinfo blogLink={AIRDROP_LINKS.WHITEPAPER} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AirdropRegistrationMini
              windowMessage={windowStatusLabelMap[activeWindow.airdrop_window_status]}
              startDate={endDate}
              windowAction={windowStatusActionMap[activeWindow.airdrop_window_status]}
              tokenName={airdropTotalTokens.name}
              totalTokens={airdropTotalTokens.value}
              totalAirdropWindows={totalWindows}
              currentAirdropWindow={windowOrder}
              onViewNotification={onViewNotification}
            />
          </Grid>
        </Grid>
      </Container>
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

  if (
    (claimStatus === ClaimStatus.SUCCESS || claimStatus === ClaimStatus.PENDING) &&
    activeWindow.airdrop_window_status === WindowStatus.CLAIM
  ) {
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
    activeWindow.airdrop_window_status == WindowStatus.UPCOMING && activeWindow.airdrop_window_order === 1;

  return showRegistrationSuccess ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <Registrationsuccess
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        onViewNotification={onViewNotification}
        windowId={activeWindow.airdrop_window_order}
        totalWindows={totalWindows}
        claimStartDate={getDateInStandardFormat(`${activeWindow?.airdrop_window_claim_start_period}`)}
        registrationValue={registrationId}
      />
    </Box>
  ) : !showMini ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <AirdropRegistration
        windowOrder={windowOrder}
        totalWindows={totalWindows}
        airdropWindowTotalTokens={activeWindow.airdrop_window_total_tokens}
        endDate={endDate}
        onRegister={handleRegistration}
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        history={airdropHistory}
        onClaim={handleClaim}
        onAutoStake={handleAutoStake}
        stakeInfo={stakeDetails}
        airdropWindowStatus={activeWindow.airdrop_window_status}
        uiAlert={uiAlert}
        activeWindow={activeWindow}
        airdropWindowrewards={airdropWindowrewards}
      />
    </Box>
  ) : (
    <Grid container spacing={2} px={4} mt={2} mb={8}>
      <Grid item xs={12} sm={6}>
        <Airdropinfo blogLink={AIRDROP_LINKS.WHITEPAPER} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AirdropRegistrationMini
          windowMessage={windowStatusLabelMap[activeWindow.airdrop_window_status]}
          startDate={moment.utc(`${activeWindow.airdrop_window_registration_start_period}`)}
          windowAction={windowStatusActionMap[activeWindow.airdrop_window_status]}
          tokenName={airdropTotalTokens.name}
          totalTokens={airdropTotalTokens.value}
          totalAirdropWindows={totalWindows}
          currentAirdropWindow={windowOrder}
          onViewNotification={onViewNotification}
        />
      </Grid>
    </Grid>
  );
};

export default Registration;
