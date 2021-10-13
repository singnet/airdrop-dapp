import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import GradientBox from "snet-ui/GradientBox";
import { Box } from "@mui/system";
import Image from "next/image";
import success from "public/images/success.png";

import InfoIcon from "@mui/icons-material/Info";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

export default function Success() {
  return (
    <Box
      sx={{
        height: "1150px",
        width: "1440px",
      }}
    >
      <GradientBox
        sx={{
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
            m: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 3,
            }}
          >
            <Image
              src={success}
              alt="SingularityNET"
              height="137px"
              width="137px"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            pb: 3,
          }}
        >
          <Box>
            <Typography
              align="center"
              fontWeight="bold"
              variant="h5"
              color="secondary.main"
              fontFamily="Montserrat"
            >
              Congratulations
            </Typography>
            <Box>
              <Typography
                align="center"
                fontWeight="bold"
                variant="h5"
                color="text.secondary"
                fontFamily="Montserrat"
              >
                Successfully Registered for Airdrop Window 1/2
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                //justifyContent: "center",
                my: 3,
                height: "108px",
                width: "620px",
                bgcolor: "note.main",
              }}
            >
              <Box sx={{ display: "flex", p: 0.6, pr: 6 }}>
                <InfoIcon color="primary" sx={{ fontSize: 25, m: 2 }} />
                <Typography
                  variant="body1"
                  color="textAdvanced.primary"
                  fontFamily="Montserrat"
                >
                  You can start claiming your tokens for Airdrop 1 from 23 Oct
                  2021. It is possible to claim all tokens with the last airdrop
                  window which allow you save on the gas cost fees. However we
                  recommend you claim your tokens at each window claim time.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ m: 2 }}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="outlined"
                  sx={{
                    height: "41px",
                    width: "169px",
                  }}
                >
                  <Typography
                    color="text.secondary"
                    fontSize="14px"
                    variant="body1"
                  >
                    Get Notifications
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
                    color="text.secondary"
                    fontSize="14px"
                    variant="body1"
                  >
                    View Schedule
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
                    color="text.secondary"
                    //fontFamily="Montserrat"
                    variant="body1"
                    fontSize="14px"
                  >
                    View Rules
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </GradientBox>
    </Box>
  );
}
