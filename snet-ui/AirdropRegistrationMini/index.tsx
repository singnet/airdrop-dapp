import React, { useMemo } from 'react';
import GradientBox from 'snet-ui/GradientBox';
import Typography from '@mui/material/Typography';
import FlipCountdown from 'snet-ui/FlipClock/Countdown';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { getDateInStandardFormat } from 'utils/date';
import { TOTAL_AIRDROPS_STRING, TOTAL_AIRDROP_TOKENS_STRING, numberWithCommas } from 'utils/airdropWindows';

type AirdropRegistrationMiniProps = {
  windowMessage: string;
  startDate: Moment;
  totalTokens: number;
  tokenName: string;
  totalAirdropWindows: number;
  currentAirdropWindow: number;
  windowAction: string;
  onClickNotification: Function;
};

export default function AirdropRegistrationMini({
  windowMessage,
  startDate,
  totalTokens,
  tokenName,
  totalAirdropWindows,
  currentAirdropWindow,
  windowAction,
  onViewNotification,
}: AirdropRegistrationMiniProps) {
  const formattedDate = useMemo(() => getDateInStandardFormat(startDate), [startDate]);
  const formattedTotalTokens = useMemo(() => numberWithCommas(totalTokens), [totalTokens]);

  return (
    <GradientBox
      $background="bgGradientHighlight"
      sx={{
        px: 2, pt: 2, pb: 2, borderRadius: 2,
      }}
    >
      <Typography color="text.secondary" variant="h4" align="center" mb={2}>
        {windowMessage} {currentAirdropWindow}/{totalAirdropWindows} {windowAction}
      </Typography>
      <Typography color="text.secondary" variant="h4" align="center" mb={4}>
        {formattedDate}
      </Typography>
      <FlipCountdown endDate={startDate} />
      <Divider sx={{ mt: 4, mb: 3, borderColor: 'text.secondary' }} />
      <Grid container>
        <Grid item xs={6} textAlign="center">
          <Typography variant="normal" color="text.secondary">
            {TOTAL_AIRDROPS_STRING}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {totalAirdropWindows}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Typography variant="normal" color="text.secondary">
            {TOTAL_AIRDROP_TOKENS_STRING}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {formattedTotalTokens} {tokenName}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3, borderColor: 'text.secondary' }} />
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          onClick={onViewNotification}
          variant="contained"
          color="secondary"
          sx={{ textTransform: 'capitalize', fontWeight: 600 }}
        >
          Get Notifications
        </Button>
      </Box>
    </GradientBox>
  );
}
