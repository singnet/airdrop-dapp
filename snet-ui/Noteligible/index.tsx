import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/system";

import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

export default function Notqualified() {
  return (
    <Box
      sx={{
        height: "1150px",
        width: "1440px",
      }}
    >
      <Box
        sx={{
          bgcolor: "bgHighlight.main",
          height: "932px",
          width: "1160px",
          m: 11,
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
          <Box sx={{ height: "311px", width: "765px" }}>
            <Box sx={{ m: 2 }}>
              <Typography
                align="center"
                fontWeight="bold"
                variant="h5"
                color="redtext.main"
                fontFamily="Montserrat"
              >
                Sorry You are Not Qualified for this Airdrop Window
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                //justifyContent: "center",
                border: 1,
                my: 3,
                height: "199px",
                width: "765px",
                bgcolor: "bgcolor.main",
                borderColor: "redtext.main",
              }}
            >
              <Box sx={{ display: "flex", p: 0.6, pr: 6, m: 3 }}>
                <Typography
                  variant="body1"
                  color="textAdvanced.primary"
                  fontFamily="Montserrat"
                >
                  You didn’t meet the following conditions
                  <Typography sx={{ p: 2 }}>
                    1, Maintain 1,000 AGIX balance in your wallet.
                    <hr />
                    2, Deposit 1,000 SDAO into any liquidity pools.
                    <hr />
                    3, Make atleast 3 transactions between 1 March 2021 and 30
                    July 2021
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <Box textAlign="center">
                <Stack spacing={3} direction="row">
                  <Button
                    variant="outlined"
                    sx={{
                      height: "40px",
                      width: "186px",
                    }}
                  >
                    <Typography
                      color="secondary.main"
                      fontSize="13px"
                      //variant="body1"
                      sx={{
                        height: "24px",
                        width: "138px",
                      }}
                    >
                      View Airdrop Rules
                    </Typography>
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      height: "40px",
                      width: "168px",
                    }}
                  >
                    <Typography
                      color="secondary.main"
                      fontSize="13px"
                      variant="body1"
                    >
                      Contact us
                    </Typography>
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
