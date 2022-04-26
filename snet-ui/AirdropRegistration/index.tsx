import React, { useMemo, useState } from 'react';
import GradientBox from '../../snet-ui/GradientBox';
import Typography from '@mui/material/Typography';
import FlipCountdown from '../../snet-ui/FlipClock/Countdown';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import InfoIcon from '@mui/icons-material/Info';
import History from '../../snet-ui/History';
import {
  AirdropWindow,
  WindowStatus,
  windowStatusActionMap,
  windowStatusLabelMap,
  windowStateMap,
  AIRDROP_TOKEN_DIVISOR,
  AIRDROP_TOKEN_SYMBOL,
} from '../../utils/airdropWindows';
import Alert, { AlertColor } from '@mui/material/Alert';
import LoadingButton from '../../snet-ui/LoadingButton';
import Link from '@mui/material/Link';
import styles from './style.module.css';
import StatusBadge from './StatusBadge';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { checkDateIsBetween, getDateInStandardFormat } from 'utils/date';
import Container from '@mui/material/Container';
import moment from 'moment';

type HistoryEvent = {
  label: string;
  value: string;
};

type StakeInfo = {
  claimableTokensToWallet: string;
  isStakable: boolean;
  tokenName: string;
  stakableTokens: string;
  isLoading: boolean;
};

type AirdropRegistrationProps = {
  windowOrder: number;
  totalWindows: number;
  airdropWindowTotalTokens?: number;
  endDate: Moment;
  onRegister: () => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  history: HistoryEvent[];
  onClaim: () => void;
  onAutoStake: () => void;
  airdropWindowStatus?: WindowStatus;
  uiAlert: { type: AlertColor; message: string };
  activeWindow?: AirdropWindow;
  stakeInfo: StakeInfo;
  airdropWindowrewards: number;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '50%',
};

export default function AirdropRegistration({
  windowOrder,
  totalWindows,
  airdropWindowTotalTokens,
  endDate,
  onRegister,
  onViewRules,
  onViewSchedule,
  history,
  onClaim,
  onAutoStake,
  stakeInfo,
  airdropWindowStatus,
  uiAlert,
  activeWindow,
  airdropWindowrewards,
}: AirdropRegistrationProps) {
  const [registrationLoader, setRegistrationLoader] = useState(false);
  const [claimLoader, setClaimLoader] = useState(false);
  const [stakeModal, setStakeModal] = useState(false);

  const formattedDate = useMemo(() => getDateInStandardFormat(endDate), [endDate]);

  const toggleStakeModal = () => {
    setStakeModal(!stakeModal);
  };

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

  const handleStakeClick = async () => {
    try {
      toggleStakeModal();
      setClaimLoader(true);
      await onAutoStake();
    } finally {
      setClaimLoader(false);
    }
  };

  if (!activeWindow) {
    return null;
  }

  const now = moment.utc(new Date());
  const isClaimActive = checkDateIsBetween(
    moment.utc(activeWindow?.airdrop_window_claim_start_period),
    moment.utc(activeWindow?.airdrop_window_claim_end_period),
    now,
  );

  const isRegistrationActive = checkDateIsBetween(
    moment.utc(activeWindow?.airdrop_window_registration_start_period),
    moment.utc(activeWindow?.airdrop_window_registration_end_period),
    now,
  );

  const windowName = windowStatusLabelMap[activeWindow?.airdrop_window_status ?? ''];
  const windowAction = windowStatusActionMap[activeWindow?.airdrop_window_status ?? ''];

  return (
    <>
      <Modal
        open={stakeModal}
        onClose={toggleStakeModal}
        aria-labelledby="stake-modal-title"
        aria-describedby="stake-modal-description"
      >
        <Box sx={{ ...style, flexGrow: 1 }}>
          {/* <Typography id="stake-modal-title" variant="h6" component="h2">
            Select Your Stake Type
          </Typography>
          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <Typography id="stake-modal-description" variant="p">
              Please select the SingularityDAO stake pool for your airdrop reward.
            </Typography>
          </Box> */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" color="text.primary">
                Tokens to be staked
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                {`${Number(stakeInfo.stakable_tokens) / AIRDROP_TOKEN_DIVISOR} ${stakeInfo.token_name}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5">Tokens to be claimed into Wallet</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">{`${Number(stakeInfo.claimable_tokens_to_wallet) / AIRDROP_TOKEN_DIVISOR} ${
                stakeInfo.token_name
              }`}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Button onClick={toggleStakeModal} color="secondary" variant="contained" fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleStakeClick} color="secondary" variant="contained" fullWidth>
                Stake
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <Grid item xs={13} justifyContent="center" alignItems="right">
              <Typography id="stake-modal-description" variant="p">
                <Link
                  href="https://app.singularitydao.ai/staking/bonded"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ mx: 1, fontSize: 14 }}
                >
                  Visit SingularityDAO
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={10} md={12}>
          <Box>
            <GradientBox
              $background="bgGradientHighlight"
              className={styles.contentWrapper}
              sx={{
                px: 4,
                pt: 4,
                pb: 5,
                borderRadius: 2,
              }}
            >
              <Container sx={{ my: 6 }}>
                <Typography color="text.secondary" variant="h4" align="center" mb={1}>
                  {windowName} &nbsp;
                  {windowOrder} / {totalWindows} &nbsp;
                  {windowAction}:
                </Typography>
                <Typography color="text.secondary" variant="h4" align="center" mb={6}>
                  {formattedDate}
                </Typography>
              </Container>

              <FlipCountdown endDate={endDate} />
              {airdropWindowStatus === WindowStatus.CLAIM && isClaimActive ? (
                <>
                  <Box sx={{ mt: 6 }}>
                    <Typography variant="subtitle1" align="center" component="p" color="text.secondary">
                      Tokens available to claim
                    </Typography>
                    <Typography variant="h2" color="textAdvanced.secondary" align="center">
                      {airdropWindowrewards / AIRDROP_TOKEN_DIVISOR} {stakeInfo.token_name}
                    </Typography>
                  </Box>
                  <Container
                    maxWidth="md"
                    sx={{
                      my: 8,
                      display: 'flex',
                      border: 0.3,
                      bgcolor: 'note.main',
                      borderRadius: 1,
                      borderColor: 'note.main',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        my: 1,
                        py: 1,
                        m: 1,
                      }}
                    >
                      <InfoIcon color="primary" />
                      <Typography variant="body2" color="textAdvanced.primary" sx={{ mx: 1, fontSize: 16 }}>
                        You can start claiming your tokens now. It is possible to claim all tokens in the last window
                        which will save you gas fees.
                      </Typography>
                    </Box>
                  </Container>
                </>
              ) : null}
              <Box sx={{ borderColor: 'error.main' }}>
                {uiAlert.message ? (
                  <Alert severity={uiAlert.type} sx={{ mt: 2 }}>
                    {uiAlert.message}
                  </Alert>
                ) : null}
              </Box>
              <Box
                sx={{
                  mt: 6,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: ['column', 'row'],
                  gap: [0, 2],
                }}
              >
                {airdropWindowStatus === WindowStatus.CLAIM && isClaimActive ? (
                  <Stack spacing={2} direction="row">
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      sx={{
                        width: 350,
                        textTransform: 'capitalize',
                        fontWeight: 600,
                      }}
                      onClick={toggleStakeModal}
                      loading={claimLoader}
                      disabled={!stakeInfo.is_stakable}
                    >
                      Stake
                    </LoadingButton>
                    <LoadingButton
                      variant="contained"
                      sx={{
                        width: 350,
                        textTransform: 'capitalize',
                        fontWeight: 600,
                      }}
                      onClick={handleClaimClick}
                      loading={claimLoader}
                    >
                      Claim to Wallet
                    </LoadingButton>
                  </Stack>
                ) : (
                  <>
                    <Stack spacing={2} direction="column">
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: [2, 0] }}>
                        {airdropWindowStatus === WindowStatus.REGISTRATION ? (
                          <LoadingButton
                            variant="contained"
                            color="secondary"
                            sx={{ textTransform: 'capitalize', width: 366, fontWeight: 600 }}
                            onClick={handleRegistrationClick}
                            loading={registrationLoader}
                          >
                            Register Now
                          </LoadingButton>
                        ) : null}
                      </Box>
                      <Stack spacing={3} direction="row">
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: [2, 0] }}>
                          <LoadingButton
                            variant="contained"
                            color="secondary"
                            onClick={onViewSchedule}
                            style={{ border: '1px solid' }}
                            sx={{
                              textTransform: 'capitalize',
                              width: 172,
                              backgroundColor: 'transparent !important',
                            }}
                          >
                            View Schedule
                          </LoadingButton>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: [2, 0] }}>
                          <LoadingButton
                            variant="contained"
                            color="secondary"
                            onClick={onViewRules}
                            style={{ border: '1px solid' }}
                            sx={{
                              textTransform: 'capitalize',
                              width: 172,
                              fontWeight: 600,
                              backgroundColor: 'transparent !important',
                            }}
                          >
                            View Rules
                          </LoadingButton>
                        </Box>
                      </Stack>
                    </Stack>
                  </>
                )}
              </Box>
              {history && history.length > 0 ? (
                <Container maxWidth="md">
                  <Typography align="center" color="textAdvanced.secondary" variant="h5">
                    Your Claim History
                  </Typography>
                  <History events={history} />
                </Container>
              ) : null}
            </GradientBox>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
