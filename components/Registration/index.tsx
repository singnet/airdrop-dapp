import Box from "@mui/material/Box";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import axios from "utils/Axios";
import { setShowConnectionModal } from "utils/store/features/walletSlice";
import { useAppDispatch } from "utils/store/hooks";
import Airdropinfo from "snet-ui/Airdropinfo";
import Grid from "@mui/material/Grid";
import AirdropRegistrationMini from "snet-ui/AirdropRegistrationMini";
import Registrationsuccess from "snet-ui/Registrationsuccess";
import { useInterval } from "usehooks-ts";
import AirdropRegistration from "snet-ui/AirdropRegistration";
import { ClaimStatus, UserEligibility } from "utils/constants/CustomTypes";
import { API_PATHS } from "utils/constants/ApiPaths";
import { WindowStatus } from "utils/airdropWindows";
import { useEthSign } from "snet-ui/Blockchain/signatureHooks";
import AirdropContractNetworks from "contract/networks/SingularityAirdrop.json";
import { parseEthersError } from "utils/ethereum";
import { useAirdropContract } from "utils/AirdropContract";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import AirdropRegistrationLoader from "snet-ui/AirdropRegistration/SkeletonLoader";
import { APIError } from "utils/errors";

interface RegistrationProps {
  userEligibility: UserEligibility;
  userRegistered: boolean;
  setUserRegistered: (value: boolean) => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  onViewNotification: () => void;
  airdropId?: number;
  airdropWindowId?: number;
  airdropWindowStatus?: WindowStatus;
  claimStatus: ClaimStatus;
  airdropWindowClosingTime: string;
}

const airdropOpensIn = new Date();
airdropOpensIn.setMinutes(airdropOpensIn.getMinutes() + 0);

const Registration: FunctionComponent<RegistrationProps> = ({
  userEligibility,
  userRegistered,
  setUserRegistered,
  onViewSchedule,
  onViewRules,
  onViewNotification,
  airdropId,
  airdropWindowId,
  airdropWindowStatus,
  airdropWindowClosingTime,
  claimStatus,
}) => {
  const [error, setErrors] = useState<any>(null);
  const [airdropOpen, setAirdropOpen] = useState(false);

  const [claimHistory, setClaimHistory] = useState([]);
  const { account, library, chainId } = useActiveWeb3React();
  const ethSign = useEthSign();
  const airdropContract = useAirdropContract(AirdropContractNetworks[chainId ?? 0]?.address);

  const dispatch = useAppDispatch();

  useInterval(() => {
    const now = new Date();
    if (now.getTime() >= airdropOpensIn.getTime()) {
      setAirdropOpen(true);
    }
  }, 500);

  useEffect(() => {
    getClaimHistory();
  }, [airdropId, airdropWindowId, account]);

  const endDate = useMemo(() => new Date(airdropWindowClosingTime), [airdropWindowClosingTime]);

  const handleRegistration = async () => {
    try {
      if (!account) {
        dispatch(setShowConnectionModal(true));
        return;
      }

      const signature = await ethSign.sign(
        ["uint8", "uint8", "address"],
        [Number(airdropId), Number(airdropWindowId), account]
      );
      if (signature) {
        await airdropUserRegistration(account, signature);
        setUserRegistered(true);
      } else {
        console.log("unable to generate signature");
      }
      // router.push(`airdrop/${airdrop.airdrop_window_id}`);
    } catch (error: any) {
      console.log(error);
      // TODO: delete the below code once the error case is properly handled
      // setUserRegistered(true);
      // router.push(`airdrop/${airdrop.airdrop_window_id}`);
      setErrors(error.toString());
    }
  };

  const getClaimHistory = async () => {
    if (typeof airdropId === "undefined" || typeof airdropWindowId === "undefined" || !account) return;
    const response: any = await axios.post(API_PATHS.CLAIM_HISTORY, {
      address: account,
      airdrop_id: `${airdropId}`,
      airdrop_window_id: `${airdropWindowId}`,
    });
    console.log("response.data", response.data.data.claim_history);
    const history = response.data.data.claim_history.map((el) => [
      {
        label: `Window ${airdropWindowId} Rewards`,
        value: `${el.claimable_amount} SDAO`,
      },
      {
        label: `Window ${airdropWindowId} Claimed`,
        value: `${el.txn_status}`,
      },
    ]);

    setClaimHistory(history.flat());
  };

  const handleClaim = async () => {
    if (typeof airdropId === "undefined" || typeof airdropWindowId === "undefined" || !account || !library) return;

    if (claimStatus === ClaimStatus.PENDING) {
      return alert("There is already a pending claim transaction. Please wait for it to get completed");
    } else if (claimStatus === ClaimStatus.SUCCESS) {
      return alert("You have already Claimed");
    }

    const getClaimDetails = async () => {
      try {
        const response: any = await axios.post(API_PATHS.CLAIM_SIGNATURE, {
          address: account,
          airdrop_id: airdropId.toString(),
          airdrop_window_id: airdropWindowId.toString(),
        });

        console.log("response", response);
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
        // TODO: Don't hardcode it, use it from the API or env
        // const tokenAddress = "0xa1e841e8f770e5c9507e2f8cfd0aa6f73009715d"; // AGIX
        const tokenAddress = "0x5e94577b949a56279637ff74dfcff2c28408f049"; // SDAO

        const txn = await airdropContract.claim(
          tokenAddress,
          claimAmount.toString(),
          airdropId?.toString(),
          airdropWindowId?.toString(),
          signature
        );
        return txn;
      } catch (error: any) {
        console.log("errrrrrrr", error);
        const ethersError = parseEthersError(error);
        if (ethersError) {
          alert(ethersError);
        }
        throw error;
      }
    };

    const saveClaimTxn = async (txnHash: string, claimAmount) => {
      const response = await axios.post(API_PATHS.CLAIM_SAVE_TXN, {
        address: account,
        txn_hash: txnHash,
        amount: claimAmount.toString(),
        airdrop_id: airdropId?.toString(),
        airdrop_window_id: airdropWindowId?.toString(),
        txn_status: "PENDING",
      });
      console.log("response.dat", response.data);
    };

    try {
      // Retreiving Claim Signature from the backend signer service
      const claimDetails = await getClaimDetails();

      // Using the claim signature and calling the Ethereum Airdrop Contract.
      const txn = await executeClaimMethod(claimDetails.signature, claimDetails.claimable_amount);

      await saveClaimTxn(txn.hash, claimDetails.claimable_amount);
      const receipt = await txn.wait();
      console.log("receipt", receipt);
    } catch (error) {
      if (error instanceof APIError) {
        alert(error.message);
      }
      console.log("signature error", error);
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
      const payload = { signature, address, airdrop_id: airdropId, airdrop_window_id: airdropWindowId };
      await axios.post("airdrop/registration", payload);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const showRegistrationSuccess = useMemo(() => userRegistered && airdropWindowStatus === WindowStatus.REGISTRATION, [
    userRegistered,
    airdropWindowStatus,
  ]);

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

  return showRegistrationSuccess ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <Registrationsuccess onViewRules={onViewRules} onViewSchedule={onViewSchedule}
      onViewNotification={onViewNotification}
      
      />
    </Box>
  ) : airdropOpen ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <AirdropRegistration
        endDate={endDate}
        onRegister={handleRegistration}
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        history={claimHistory}
        onClaim={handleClaim}
        airdropWindowStatus={airdropWindowStatus}
      />
    </Box>
  ) : (
    <Grid container spacing={2} px={4} mt={2} mb={8}>
      <Grid item xs={12} sm={6}>
        <Airdropinfo blogLink="www.google.com" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AirdropRegistrationMini startDate={airdropOpensIn} />
      </Grid>
    </Grid>
  );
};

export default Registration;
