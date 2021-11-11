import React, { useMemo, useState } from "react";
import GradientBox from "snet-ui/GradientBox";
import Typography from "@mui/material/Typography";
import FlipCountdown from "snet-ui/FlipClock/Countdown";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import InfoIcon from "@mui/icons-material/Info";
import History from "snet-ui/History";
import { AirdropWindow, WindowStatus } from "utils/airdropWindows";
import Alert, { AlertColor } from "@mui/material/Alert";
import LoadingButton from "snet-ui/LoadingButton";
import styles from "./style.module.css";
import StatusBadge from "./StatusBadge";
import { isDateBetween, isDateGreaterThan } from "utils/date";

type HistoryEvent = {
  label: string;
  value: string;
};

type AirdropRegistrationProps = {
  currentWindowId: number;
  totalWindows: number;
  airdropWindowTotalTokens?: number;
  endDate: Date;
  onRegister: () => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  history: HistoryEvent[];
  onClaim: () => void;
  airdropWindowStatus?: WindowStatus;
  uiAlert: { type: AlertColor; message: string };
  activeWindow?: AirdropWindow;
};

const DateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  // timeZone: "UTC",
  timeZoneName: "short",
});

const windowStatusLabelMap = {
  [WindowStatus.UPCOMING]: "registration",
  [WindowStatus.REGISTRATION]: "registration",
  [WindowStatus.IDLE]: "claim",
  [WindowStatus.CLAIM]: "claim",
};

const windowStatusActionMap = {
  [WindowStatus.UPCOMING]: "opens",
  [WindowStatus.REGISTRATION]: "closes",
  [WindowStatus.IDLE]: "opens",
  [WindowStatus.CLAIM]: "claim",
};

const statusLabelMap = {
  [WindowStatus.CLAIM]: "claim open",
  [WindowStatus.REGISTRATION]: "registration open",
  [WindowStatus.UPCOMING]: "",
};

export default function AirdropRegistration({
  currentWindowId,
  totalWindows,
  airdropWindowTotalTokens,
  endDate,
  onRegister,
  onViewRules,
  onViewSchedule,
  history,
  onClaim,
  airdropWindowStatus,
  uiAlert,
  activeWindow,
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

  // const isUpcomingClaim = isDateBetween(
  //   `${activeWindow?.airdrop_window_registration_end_period} UTC`,
  //   `${activeWindow?.airdrop_window_claim_start_period} UTC`,
  //   new Date()
  // );

  if (!activeWindow) {
    return null;
  }

  const isUpcomingRegistration = isDateGreaterThan(
    `${activeWindow?.airdrop_window_registration_start_period} UTC`,
    new Date()
  );

  // const isUpcomingClaim = isDateGreaterThan(`${activeWindow?.airdrop_window_claim_start_period} UTC`, new Date());

  const isClaimActive = isDateBetween(
    `${activeWindow?.airdrop_window_claim_start_period} UTC`,
    `${activeWindow?.airdrop_window_claim_end_period} UTC`,
    new Date()
  );

  const isRegistrationActive = isDateBetween(
    `${activeWindow?.airdrop_window_registration_start_period} UTC`,
    `${activeWindow?.airdrop_window_registration_end_period} UTC`,
    new Date()
  );

  const windowName = windowStatusLabelMap[activeWindow?.airdrop_window_status ?? ""];

  const windowAction = windowStatusActionMap[activeWindow?.airdrop_window_status ?? ""];

  return (
    <Box>
      <GradientBox
        $background="bgGradientHighlight"
        className={styles.contentWrapper}
        sx={{ px: 4, pt: 4, pb: 5, borderRadius: 2 }}
      >
        <StatusBadge label={isRegistrationActive || isClaimActive ? statusLabelMap[airdropWindowStatus ?? ""] : ""} />
        <Typography color="text.secondary" variant="h4" align="center" mb={1}>
          Airdrop {windowName} window &nbsp;
          {currentWindowId} / {totalWindows} &nbsp;
          {windowAction}:
        </Typography>
        <Typography color="text.secondary" variant="h4" align="center" mb={6}>
          {formattedDate}
        </Typography>
        <FlipCountdown endDate={endDate} />
        {airdropWindowStatus === WindowStatus.CLAIM && isClaimActive ? (
          <>
            <Box sx={{ mt: 2 }}>
              <Typography variant="label" align="center" component="p">
                Airdrop window {currentWindowId} / {totalWindows} rewards
              </Typography>
              <Typography variant="h5" color="textAdvanced.secondary" align="center">
                {airdropWindowTotalTokens}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 4,

                bgcolor: "note.main",
              }}
            >
              <Box sx={{ display: "flex", my: 1, py: 1, m: 1 }}>
                <InfoIcon color="primary" />
                <Typography variant="body1" color="textAdvanced.primary">
                  You can start claiming your tokens now. It is possible to claim all tokens with the last airdrop
                  window which allow you save on the gas cost fees. However we recommend you claim your tokens at each
                  window claim time.
                </Typography>
              </Box>
            </Box>
          </>
        ) : null}
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center", flexDirection: ["column", "row"], gap: [0, 2] }}>
          {airdropWindowStatus === WindowStatus.CLAIM && isClaimActive ? (
            <LoadingButton
              variant="contained"
              color="secondary"
              sx={{ width: 170 }}
              onClick={handleClaimClick}
              loading={claimLoader}
            >
              Claim Now
            </LoadingButton>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
                {airdropWindowStatus === WindowStatus.REGISTRATION ? (
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
            </>
          )}
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
