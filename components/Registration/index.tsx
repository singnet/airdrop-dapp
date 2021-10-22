import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { arrayify, solidityKeccak256 } from "ethers/lib/utils";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
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
import { UserEligibility } from "utils/constants/CustomTypes";
import { API_PATHS } from "utils/constants/ApiPaths";
import { WindowStatus } from "utils/airdropWindows";

interface RegistrationProps {
  userEligibility: UserEligibility;
  onViewSchedule: () => void;
  onViewRules: () => void;
  airdropId?: number;
  airdropWindowId?: number;
  airdrooWindowStatus?: WindowStatus;
}

const airdropOpensIn = new Date();
airdropOpensIn.setMinutes(airdropOpensIn.getMinutes() + 0);

const airdropClosesIn = new Date();
airdropClosesIn.setMinutes(airdropClosesIn.getMinutes() + 135);
airdropClosesIn.setDate(airdropClosesIn.getDate() + 3);

const Registration: FunctionComponent<RegistrationProps> = ({
  userEligibility,
  onViewSchedule,
  onViewRules,
  airdropId,
  airdropWindowId,
  airdrooWindowStatus,
}) => {
  const [airdrop, setAirdrop] = useState<any>(null);
  const [error, setErrors] = useState<any>(null);
  const [airdropOpen, setAirdropOpen] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [claimHistory, setClaimHistory] = useState([]);

  const { account, library } = useActiveWeb3React();
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log("airdrooWindowStatus", airdrooWindowStatus);

  useInterval(() => {
    const now = new Date();
    if (now.getTime() >= airdropOpensIn.getTime()) {
      setAirdropOpen(true);
    }
  }, 500);

  useEffect(() => {
    getClaimHistory();
  }, [airdropId, airdropWindowId, account]);

  const airdropRegistration = async () => {
    try {
      if (!account) {
        dispatch(setShowConnectionModal(true));
        return;
      }

      // TODO: Wait until metamask is connected
      const signature = await signTransaction(account);
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

  const signTransaction = async (account: string) => {
    if (!library) return;

    const message = solidityKeccak256(
      ["uint8", "uint8", "address"],
      [Number(airdropId), Number(airdropWindowId), account]
    );

    const bytesDataHash = arrayify(message);

    const signer = await library.getSigner();
    const signature = await signer.signMessage(bytesDataHash);

    return signature;
  };

  const airdropUserRegistration = async (address: string, signature: string) => {
    try {
      const payload = { signature, address, airdrop_id: airdropId, airdrop_window_id: airdropWindowId };
      await axios.post("airdrop/registration", payload);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  if (userEligibility === UserEligibility.PENDING) {
    return <Typography>Loading Eligibility</Typography>;
  }
  if (userEligibility === UserEligibility.NOT_ELIGIBLE) {
    return null;
  }

  return userRegistered ? (
    <Registrationsuccess />
  ) : airdropOpen ? (
    <Box sx={{ px: [0, 4, 15] }}>
      <AirdropRegistration
        endDate={airdropClosesIn}
        onRegister={airdropRegistration}
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        history={claimHistory}
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

  return airdrop !== null ? (
    <>
      <Box
        sx={{
          padding: "4rem",
        }}
      >
        <Typography variant="h3" align="center">
          {airdrop.airdrop_window_name}
        </Typography>
        <Button onClick={airdropRegistration} variant="contained">
          Register
        </Button>
        {error !== null ? <Alert severity="error">{error}</Alert> : null}
      </Box>
    </>
  ) : null;
};

export default Registration;
