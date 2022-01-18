import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import GradientBox from "../../snet-ui/GradientBox";
import { Box } from "@mui/system";
import History from "snet-ui/History";
import Container from "@mui/material/Container";
// import Image from "next/image";
// import success from "public/images/success.png";

import InfoIcon from "@mui/icons-material/Info";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

type RegistrationSuccessProps = {
  onViewSchedule: () => void;
  onViewRules: () => void;
  onViewNotification: () => void;
  currentWindowId: number;
  totalWindows: number;
  history: [];
};

export default function ClaimSuccess({
  onViewSchedule,
  onViewRules,
  onViewNotification,
  currentWindowId,
  totalWindows,
  history,
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
                Successfully Claimed for Window {currentWindowId}/
                {totalWindows}
              </Typography>
            </Box>
            <Box sx={{ m: 8, my: 2, py: 2 }}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="outlined"
                  onClick={onViewNotification}
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  <Typography color="text.secondary" fontSize="14px">
                    Get Notifications
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  onClick={onViewSchedule}
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  <Typography color="text.secondary" fontSize="14px">
                    View Schedule
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
        {history && history.length > 0 ? (
          <Container maxWidth="md">
            <Typography
              align="center"
              color="textAdvanced.secondary"
              variant="h5"
            >
              Your Claim History
            </Typography>
            <History events={history} />
          </Container>
        ) : null}
      </GradientBox>
    </Box>
  );
}
