import React, { useMemo } from "react";
import GradientBox from "snet-ui/GradientBox";
import Typography from "@mui/material/Typography";
import FlipCountdown from "snet-ui/FlipClock/Countdown";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
type AirdropRegistrationMiniProps = {
  startDate: Date;
  totalTokens: number;
  tokenName: string;
  totalAirdropWindows: number;
  currentAirdropWindow: number;
  windowAction: string;
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
export default function AirdropRegistrationMini({
  startDate,
  totalTokens,
  tokenName,
  totalAirdropWindows,
  currentAirdropWindow,
  windowAction,
}: AirdropRegistrationMiniProps) {
  const formattedDate = useMemo(() => DateFormatter.format(startDate), [
    startDate,
  ]);
  return (
    <GradientBox
      $background="bgGradientHighlight"
      sx={{ px: 4, pt: 4, pb: 5, borderRadius: 2 }}
    >
      <Typography color="text.secondary" variant="h4" align="center" mb={6}>
        Airdrop registration window {currentAirdropWindow}/{totalAirdropWindows}{" "}
        {windowAction} {formattedDate}
      </Typography>
      <FlipCountdown endDate={startDate} />
      <Divider sx={{ mt: 4, mb: 3, borderColor: "text.secondary" }} />
      <Grid container>
        <Grid item xs={6} textAlign="center">
          <Typography variant="normal" color="text.secondary">
            Airdrop
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {totalAirdropWindows}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Typography variant="normal" color="text.secondary">
            Total Token Worth
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {totalTokens} {tokenName}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3, borderColor: "text.secondary" }} />
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button variant="contained" color="secondary">
          Get Notifications
        </Button>
      </Box>
    </GradientBox>
  );
}
