import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { arrayify, solidityKeccak256 } from "ethers/lib/utils";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import axios from "utils/Axios";

interface AirdropProps {}

const Airdrop: FunctionComponent<AirdropProps> = () => {
  const [airdrop, setAirdrop] = useState<any>(null);
  const [openWallet, setWalletStatus] = useState<boolean>(false);
  const [error, setErrors] = useState<any>(null);

  const { account, library } = useActiveWeb3React();
  const router = useRouter();

  useEffect(() => {
    fetchAirdrop();
  }, []);

  const handleWalletConnect = () => {
    setWalletStatus(true);
  };

  const fetchAirdrop = async () => {
    try {
      const payload = {
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
        handleWalletConnect();
        return;
      }

      // TODO: Wait until metamask is connected
      const signature = await signTransaction(account);
      await airdropEligibilityCheck(account, signature);
      await airdropUserRegistration(account, signature);
      router.push(`airdrop/${airdrop.airdrop_window_id}/user/${account}`);
    } catch (error: any) {
      console.log(error);
      setErrors(error.toString());
    }
  };

  const signTransaction = async (account: string) => {
    const { airdrop_id, airdrop_window_id } = airdrop;

    const message = solidityKeccak256(
      ["uint8", "uint8", "address"],
      [Number(airdrop_id), Number(airdrop_window_id), account]
    );

    const bytesDataHash = arrayify(message);

    const signer = await library.getSigner();
    const signature = await signer.signMessage(bytesDataHash);

    setWalletStatus(false);
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

export default Airdrop;
