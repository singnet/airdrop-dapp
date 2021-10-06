import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import Header from "snet-ui/Header/Header";
import axios from "utils/Axios";

interface AirdropWindowProps {}

const style = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 2,
};

const AirdropWindow: FunctionComponent<AirdropWindowProps> = () => {
  const [values, setValues] = useState({
    account: "",
    airdropWindowName: "",
    airdropWindowRewards: "Pending",
    airdropWindowRewardsClaimed: "Pending",
    airdropWindowRegisteredAt: "",
  });

  const router = useRouter();

  useEffect(() => {
    getUserRegistrationInfo();
  }, [account, airdropwindow]);

  const getUserRegistrationInfo = async () => {
    try {
      const { account, airdropwindow } = router.query;
      const payload = {
        address: account,
        airdrop_window_id: airdropwindow,
      };
      const { data } = await axios.post("airdrop/user-details", payload);
      setValues({
        ...values,
        account,
        airdropwindow,
        airdropWindowName: data.data.window_name,
        airdropWindowRegisteredAt: data.data.registered_at,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Airdrop</title>
      </Head>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body2">Airdrop Eligibility</Typography>
              <Typography variant="h6">Airdrop</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Connected Wallet address</Typography>
              <Typography variant="h6">{values.account}</Typography>
            </Box>
          </Box>
          <Box sx={style}>
            <Typography variant="h6">
              {values.airdropWindowName} Registration
            </Typography>
            <Typography variant="h6">
              {values.airdropWindowRegisteredAt}
            </Typography>
          </Box>
          <Box sx={style}>
            <Typography variant="h6">
              {values.airdropWindowName} Rewards
            </Typography>
            <Typography variant="h6">{values.airdropWindowRewards}</Typography>
          </Box>
          <Box sx={style}>
            <Typography variant="h6">
              {values.airdropWindowName} Rewards claimed
            </Typography>
            <Typography variant="h6">
              {values.airdropWindowRewardsClaimed}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AirdropWindow;
