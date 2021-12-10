import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid";
import CancelIcon from "@mui/icons-material/Cancel";
import { Divider, Stack } from "@mui/material";
import Button from "@mui/material/Button";

const defaultRejectReason = "You're not eligible for the airdrop";

type NotqualifiedProps = {
  account: string;
  network: string;
  onViewRules: () => void;
  rejectReasons?: string;
};

export default function Notqualified({
  account,
  network,
  onViewRules,
  rejectReasons,
}: NotqualifiedProps) {
  return (
    <Box sx={{ bgcolor: "bgHighlight.main", my: 2, py: 8, pb: 2 }}>
      <Grid container spacing={2} px={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="normal">Airdrop Eligibility</Typography>

          <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
            <Box color="success" sx={{ mr: 1 }}>
              <CancelIcon color="error" />
            </Box>

            <Typography variant="h5" color="primary.main">
              Not Qualified
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Connected Wallet Address</Typography>
          <Typography noWrap variant="priority" component="p">
            {account}
          </Typography>
          <Typography sx={{ textTransform: "capitalize" }} variant="priority">
            Ethereum {network?.toLowerCase()}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
        <Box sx={{ my: 2, py: 1 }}>
          <Box sx={{ m: 2 }}>
            <Typography align="center" variant="h5" color="error.contrastText">
              Sorry You are Not Qualified for this Airdrop Window
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              border: 1,
              my: 1,
              py: 1,
              bgcolor: "error.light",
              borderRadius: 1.5,
              borderColor: "error.contrastText",
            }}
          >
            <Box sx={{ p: 0.6, pr: 6, m: 3 }}>
              <Typography variant="body1" color="textAdvanced.primary">
                {rejectReasons ?? defaultRejectReason}
              </Typography>
              {/* <Typography variant="body1" color="textAdvanced.primary">
                You didn’t meet the following conditions
              </Typography>
              <Typography sx={{ p: 2 }}>
                1, Maintain 1,000 AGIX balance in your wallet.
              </Typography>
              <Divider component="p" />
              <Typography sx={{ p: 2 }}>
                2, Deposit 1,000 SDAO into any liquidity pools.
              </Typography>
              <Divider />
              <Typography sx={{ p: 2 }}>
                3, Make atleast 3 transactions between 1 March 2021 and 30 July 2021
              </Typography> */}
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <Box textAlign="center">
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={onViewRules}
                  sx={{textTransform:"capitalize"}}
                >
                  <Typography color="secondary.main" variant="subtitle2">
                    View Airdrop Rules
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  href="/contactus"
                  sx={{textTransform:"capitalize"}}
                >
                  <Typography color="secondary.main" variant="subtitle2">
                    Contact us
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
