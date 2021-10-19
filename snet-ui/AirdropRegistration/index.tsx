import React, { useMemo } from "react";
import GradientBox from "snet-ui/GradientBox";
import Typography from "@mui/material/Typography";
import FlipCountdown from "snet-ui/FlipClock/Countdown";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";

type AirdropRegistrationProps = {
  endDate: Date;
  onRegister: () => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
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

export default function AirdropRegistration({ endDate }: AirdropRegistrationProps) {
  const formattedDate = useMemo(() => DateFormatter.format(endDate), [endDate]);
  return (
    <GradientBox $background="bgGradientHighlight" sx={{ px: 4, pt: 4, pb: 5, borderRadius: 2 }}>
      <Typography color="text.secondary" variant="h4" align="center" mb={6}>
        Airdrop registration window closes {formattedDate}
      </Typography>
      <FlipCountdown endDate={endDate} />
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center", flexDirection: ["column", "row"], gap: [0, 2] }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
          <Button variant="contained" color="secondary" sx={{ width: 170 }}>
            Register Now
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
          <Button variant="contained" color="secondary" sx={{ width: 170 }}>
            View Schedule
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: [2, 0] }}>
          <Button variant="contained" color="secondary" sx={{ width: 170 }}>
            View Rules
          </Button>
        </Box>
      </Box>
    </GradientBox>
  );
}
