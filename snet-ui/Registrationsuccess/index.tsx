import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import GradientBox from "../../snet-ui/GradientBox";
import { Box } from "@mui/system";
// import Image from "next/image";
// import success from "public/images/success.png";

import InfoIcon from "@mui/icons-material/Info";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

type RegistrationSuccessProps = {
  onViewSchedule: () => void;
  onViewRules: () => void;
  onViewNotification: () => void;
  windowId: number;
  totalWindows: number;
  claimStartDate: string;
};

export default function Success({
  onViewSchedule,
  onViewRules,
  onViewNotification,
  windowId,
  totalWindows,
  claimStartDate,
}: RegistrationSuccessProps) {
  return (
    <Box>
      <GradientBox sx={{ py: 2, pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <img
              src="/images/success.png"
              alt="SingularityNET"
              height="137px"
              width="137px"
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
          <Box>
            <Typography align="center" variant="h4" color="secondary.main">
              Congratulations
            </Typography>
            <Box>
              <Typography
                align="center"
                fontWeight="bold"
                variant="h5"
                color="text.secondary"
              >
                Successfully Registered for Vesting Window {windowId} /{" "}
                {totalWindows}
              </Typography>
            </Box>
            <Box
              sx={{
                my: 8,

                mx: 28,

                display: "flex",
                border: 0.3,

                bgcolor: "note.main",
                borderRadius: 1,
                borderColor: "note.main",
              }}
            >
              <Box sx={{ display: "flex", my: 1, py: 1, m: 1 }}>
                <InfoIcon color="primary" />
                <Typography variant="body2" color="textAdvanced.primary">
                  You can start claiming your tokens for Vesting from{" "}
                  {claimStartDate}. It is possible to
                  claim all tokens with the last window which will 
                  save you gas fees.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mx: 35}}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="outlined"
                  
                color="bgHighlight"
                  onClick={onViewNotification}
                  sx={{ textTransform: "capitalize" }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    Get Notifications
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
              
                color="bgHighlight"
                  onClick={onViewSchedule}
                  sx={{ textTransform: "capitalize" }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Schedule
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
