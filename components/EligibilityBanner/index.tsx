import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { SupportedChainId } from 'snet-ui/Blockchain/connectors';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UserEligibility } from 'utils/constants/CustomTypes';
import Notqualified from 'snet-ui/Noteligible';
import SkeletonLoader from './SkeletonLoader';
import { useAppSelector } from 'utils/store/hooks';
import { selectActiveWindow } from 'utils/store/features/activeWindowSlice';
import { AIRDROP_ELIGIBILITY_STRING, windowNameActionMap } from 'utils/airdropWindows';

type EligibilityBannerProps = {
  onViewRules: () => void;
  onViewSchedule: () => void;
  userEligibility: UserEligibility;
  rejectReasons?: string;
};

export default function EligibilityBanner({
  userEligibility,
  onViewRules,
  onViewSchedule,
  rejectReasons,
}: EligibilityBannerProps) {
  const { account, chainId, library } = useActiveWeb3React();
  const { window: activeWindow, totalWindows } = useAppSelector(selectActiveWindow);

  const network = useMemo(() => SupportedChainId[chainId ?? ''], [chainId]);

  if (!account) return null;

  if (userEligibility === UserEligibility.PENDING) {
    return <SkeletonLoader />;
  }

  if (userEligibility === UserEligibility.NOT_ELIGIBLE) {
    return (
      <Notqualified
        account={account}
        network={network}
        onViewRules={onViewRules}
        onViewSchedule={onViewSchedule}
        rejectReasons={rejectReasons}
      />
    );
  }

  if (!activeWindow) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: 'bgHighlight.main',
        my: 1,
        p: 4,
        py: 2,
        borderRadius: 2,
      }}
      color="textAdvanced.dark"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="normal">{AIRDROP_ELIGIBILITY_STRING}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box color="success" sx={{ mr: 1, mt: 1 }}>
              <CheckCircleIcon color="success" />
            </Box>

            <Typography variant="h5" color="primary.main">
              Qualified for {windowNameActionMap[activeWindow.airdrop_window_status]} Window{' '}
              {activeWindow.airdrop_window_order} / {totalWindows}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Connected Wallet Address</Typography>
          <Typography noWrap variant="priority" component="p">
            {account}
          </Typography>
          <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
            Ethereum {network?.toLowerCase()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
