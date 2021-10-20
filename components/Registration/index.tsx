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

interface RegistrationProps {
  onViewSchedule: () => void;
  onViewRules: () => void;
}

const airdropOpensIn = new Date();
airdropOpensIn.setMinutes(airdropOpensIn.getMinutes() + 0);

const airdropClosesIn = new Date();
airdropClosesIn.setMinutes(airdropClosesIn.getMinutes() + 135);
airdropClosesIn.setDate(airdropClosesIn.getDate() + 3);

const Registration: FunctionComponent<RegistrationProps> = ({ onViewSchedule, onViewRules }) => {
  const [airdrop, setAirdrop] = useState<any>(null);
  const [error, setErrors] = useState<any>(null);
  const [airdropOpen, setAirdropOpen] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);

  const { account, library } = useActiveWeb3React();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAirdrop();
  }, []);

  useInterval(() => {
    const now = new Date();
    if (now.getTime() >= airdropOpensIn.getTime()) {
      setAirdropOpen(true);
    }
  }, 500);

  const fetchAirdrop = async () => {
    try {
      const payload: any = {
        limit: "100",
        skip: "0",
      };
      const { data } = await axios.post("airdrops", payload);
      const [airdropData] = data.data.airdrops;
      setAirdrop(airdropData);
    } catch (error) {
      console.log(error);
    }
  };

  const airdropRegistration = async () => {
    try {
      if (!account) {
        dispatch(setShowConnectionModal(true));
        return;
      }

      // TODO: Wait until metamask is connected
      const signature = await signTransaction(account);
      if (signature) {
        await airdropEligibilityCheck(account, signature);
        await airdropUserRegistration(account, signature);
      }
      router.push(`airdrop/${airdrop.airdrop_window_id}`);
    } catch (error: any) {
      console.log(error);
      // TODO: delete the below code once the error case is properly handled
      setUserRegistered(true);
      // router.push(`airdrop/${airdrop.airdrop_window_id}`);
      setErrors(error.toString());
    }
  };

  const signTransaction = async (account: string) => {
    if (!library) return;
    const { airdrop_id, airdrop_window_id } = airdrop;

    const message = solidityKeccak256(
      ["uint8", "uint8", "address"],
      [Number(airdrop_id), Number(airdrop_window_id), account]
    );

    const bytesDataHash = arrayify(message);

    const signer = await library.getSigner();
    const signature = await signer.signMessage(bytesDataHash);

    return signature;
  };

  const airdropUserRegistration = async (address: string, signature: string) => {
    try {
      const { airdrop_id, airdrop_window_id } = airdrop;
      const payload = {
        signature,
        address,
        airdrop_id,
        airdrop_window_id,
      };
      await axios.post("airdrop/registration", payload);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const airdropEligibilityCheck = async (address: string, signature: string) => {
    try {
      const { airdrop_id, airdrop_window_id } = airdrop;
      const payload = {
        signature,
        address,
        airdrop_id,
        airdrop_window_id,
      };
      await axios.post("airdrop/user-eligibility", payload);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return userRegistered ? (
    <Registrationsuccess />
  ) : airdropOpen ? (
    <Box sx={{ px: [0, 15] }}>
      <AirdropRegistration
        endDate={airdropClosesIn}
        onRegister={airdropRegistration}
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
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
