import React, { useMemo, useState } from "react";
import GradientBox from "snet-ui/GradientBox";
import Typography from "@mui/material/Typography";
import FlipCountdown from "snet-ui/FlipClock/Countdown";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import History from "snet-ui/History";

type HistoryEvent = {
  label: string;
  value: string;
};

type AirdropRegistrationProps = {
  endDate: Date;
  onRegister: () => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  history: HistoryEvent[];
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
  endDate,
  onRegister,
  onViewRules,
  onViewSchedule,
  history,
}: AirdropRegistrationProps) {
  const [registrationLoader, setRegistrationLoader] = useState(false);
  const formattedDate = useMemo(() => DateFormatter.format(endDate), [endDate]);

  const handleRegistrationClick = async () => {
    setRegistrationLoader(true);
    await onRegister();
    setRegistrationLoader(false);
  };

  return (
    <GradientBox $background="bgGradientHighlight" sx={{ px: 4, pt: 4, pb: 5, borderRadius: 2 }}>
      <Typography color="text.secondary" variant="h4" align="center" mb={6}>
        Airdrop registration window closes {formattedDate}
      </Typography>
      <FlipCountdown endDate={endDate} />
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center", flexDirection: ["column", "row"], gap: [0, 2] }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
          <LoadingButton
            variant="contained"
            color="secondary"
            sx={{ width: 170 }}
            onClick={handleRegistrationClick}
            loading={registrationLoader}
          >
            Register Now
          </LoadingButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
          <LoadingButton variant="contained" color="secondary" sx={{ width: 170 }} onClick={onViewSchedule}>
            View Schedule
          </LoadingButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
          <LoadingButton variant="contained" color="secondary" sx={{ width: 170 }} onClick={onViewRules}>
            View Rules
          </LoadingButton>
        </Box>
      </Box>
      <Box>
        <Typography align="center" color="textAdvanced.secondary" variant="h5" mt={6}>
          Your Airdrop History
        </Typography>
        <History events={history} />
      </Box>
    </GradientBox>
  );
}
