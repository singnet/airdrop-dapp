import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/system";

import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

export default function Notqualified() {
  return (
    <Box
      sx={{
        bgcolor: "bgHighlight.main",

        my: 2,
        py: 8,
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",

          pb: 3,
        }}
      >
        <Box
          sx={{
            my: 2,
            py: 1,
          }}
        >
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

              bgcolor: "error.main",
              borderColor: "error.contrastText",
            }}
          >
            <Box sx={{ display: "flex", p: 0.6, pr: 6, m: 3 }}>
              <Typography variant="body1" color="textAdvanced.primary">
                You didn’t meet the following conditions
                <Typography sx={{ p: 2 }}>
                  1, Maintain 1,000 AGIX balance in your wallet.
                  <hr />
                  2, Deposit 1,000 SDAO into any liquidity pools.
                  <hr />
                  3, Make atleast 3 transactions between 1 March 2021 and 30 July 2021
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <Box textAlign="center">
              <Stack spacing={2} direction="row">
                <Button variant="outlined" size="large">
                  <Typography color="secondary.main" fontSize="13px">
                    View Airdrop Rules
                  </Typography>
                </Button>

                <Button variant="outlined" size="large">
                  <Typography color="secondary.main" fontSize="13px">
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
