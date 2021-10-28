import React, { useMemo, useState } from "react";
import GradientBox from "snet-ui/GradientBox";
import Typography from "@mui/material/Typography";
import FlipCountdown from "snet-ui/FlipClock/Countdown";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";

import History from "snet-ui/History";
import { WindowStatus } from "utils/airdropWindows";
import Alert, { AlertColor } from "@mui/material/Alert";
import LoadingButton from "snet-ui/LoadingButton";

type HistoryEvent = {
  label: string;
  value: string;
};

type AirdropRegistrationProps = {
  currentWindowId: number;
  totalWindows: number;
  endDate: Date;
  onRegister: () => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  history: HistoryEvent[];
  onClaim: () => void;
  airdropWindowStatus?: WindowStatus;
  uiAlert: { type: AlertColor; message: string };
};

const DateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC",
  timeZoneName: "short",
});

export default function AirdropRegistration({
  currentWindowId,
  totalWindows,
  endDate,
  onRegister,
  onViewRules,
  onViewSchedule,
  history,
  onClaim,
  airdropWindowStatus,
  uiAlert,
}: AirdropRegistrationProps) {
  const [registrationLoader, setRegistrationLoader] = useState(false);
  const [claimLoader, setClaimLoader] = useState(false);
  const formattedDate = useMemo(() => DateFormatter.format(endDate), [endDate]);

  const handleRegistrationClick = async () => {
    try {
      setRegistrationLoader(true);
      await onRegister();
    } finally {
      setRegistrationLoader(false);
    }
  };

  const handleClaimClick = async () => {
    try {
      setClaimLoader(true);
      await onClaim();
    } finally {
      setClaimLoader(false);
    }
  };

  return (
    <Box>
      <GradientBox $background="bgGradientHighlight" sx={{ px: 4, pt: 4, pb: 5, borderRadius: 2 }}>
        <Typography color="text.secondary" variant="h4" align="center" mb={1}>
          Airdrop registration window {currentWindowId} / {totalWindows} closes:
        </Typography>
        <Typography color="text.secondary" variant="h4" align="center" mb={6}>
          {formattedDate}
        </Typography>
        <FlipCountdown endDate={endDate} />
        <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}></Box>
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center", flexDirection: ["column", "row"], gap: [0, 2] }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
            {airdropWindowStatus === WindowStatus.CLAIM ? (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ width: 170 }}
                onClick={handleClaimClick}
                // loading={claimLoader}
                loading
              >
                Claim
              </LoadingButton>
            ) : airdropWindowStatus === WindowStatus.REGISTRATION ? (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ width: 170 }}
                onClick={handleRegistrationClick}
                loading={registrationLoader}
              >
                Register Now
              </LoadingButton>
            ) : null}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
            <Button variant="contained" color="secondary" sx={{ width: 170 }} onClick={onViewSchedule}>
              View Schedule
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
            <Button variant="contained" color="secondary" sx={{ width: 170 }} onClick={onViewRules}>
              View Rules
            </Button>
          </Box>
        </Box>
        <Box sx={{ px: 2 }}>
          {uiAlert.message ? (
            <Alert severity={uiAlert.type} sx={{ mt: 2 }}>
              {uiAlert.message}
            </Alert>
          ) : null}
        </Box>
        {history && history.length > 0 ? (
          <Box>
            <Typography align="center" color="textAdvanced.secondary" variant="h5" mt={6}>
              Your Airdrop History
            </Typography>
            <History events={history} />
          </Box>
        ) : null}
      </GradientBox>
    </Box>
  );
}
