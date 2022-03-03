import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppSelector } from 'utils/store/hooks';
import { selectActiveWindow } from 'utils/store/features/activeWindowSlice';
import {
  AIRDROP_ELIGIBILITY_STRING,
  AIRDROP_NOT_QUALIFIED_STRING,
  AIRDROP_WINDOW_INELIGIBILITY_STRING,
  AIRDROP_CHECK_RULES_SCHEDULE,
} from 'utils/airdropWindows';

type NotqualifiedProps = {
  account: string;
  network: string;
  onViewRules: () => void;
  onViewSchedule: () => void;
  rejectReasons?: string;
};

export default function Notqualified({
  account,
  network,
  onViewRules,
  onViewSchedule,
  rejectReasons,
}: NotqualifiedProps) {
  const { window: activeWindow, totalWindows } = useAppSelector(selectActiveWindow);

  return (
    <Box
      sx={{
        bgcolor: 'bgHighlight.main',
        my: 2,
        py: 8,
        pb: 2,
      }}
    >
      <Grid container spacing={2} px={3} direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={8} md={6}>
          <Typography variant="normal">{AIRDROP_ELIGIBILITY_STRING}</Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 0.5,
              pr: 0,
            }}
          >
            <Box color="success" sx={{ mr: 1 }}>
              <CancelIcon color="error" />
            </Box>
            <Typography variant="h5" color="primary.main">
              {AIRDROP_NOT_QUALIFIED_STRING}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Connected Wallet Address</Typography>
          <Typography noWrap variant="priority" component="p">
            {account}
          </Typography>
          <Typography sx={{ textTransform: 'capitalize' }} variant="priority">
            Ethereum {network?.toLowerCase()}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
        <Box sx={{ my: 2, py: 1 }}>
          <Box
            sx={{
              display: 'flex',
              border: 1,
              my: 1,
              py: 1,
              bgcolor: 'error.light',
              borderRadius: 1.5,
              borderColor: 'error.contrastText',
            }}
          >
            <Box sx={{ p: 0.6, pr: 6, m: 3 }}>
              <Typography variant="body1" color="textAdvanced.primary">
                {AIRDROP_WINDOW_INELIGIBILITY_STRING} {activeWindow.airdrop_window_order} / {totalWindows} {'. '}
                {AIRDROP_CHECK_RULES_SCHEDULE}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
            <Box textAlign="center">
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={onViewSchedule}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <Typography color="secondary.main" variant="subtitle2">
                    View Schedule
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={onViewRules}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <Typography color="secondary.main" variant="subtitle2">
                    View Airdrop Rules
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  href="/contactus"
                  sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                >
                  <Typography color="secondary.main" variant="subtitle2">
                    Contact us
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
