import React, { forwardRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import GradientBox from '../../snet-ui/GradientBox';
import MuiTextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import LoadingButton from '../../snet-ui/LoadingButton';
import { APIError, ValidationError } from '../../utils/errors';
import { AlertTypes } from '../../utils/constants/alert';
import { Alert, AlertTitle, Container } from '@mui/material';
import colors from '../Theme/colors';
import { ErrorOutline } from '@mui/icons-material';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const TextField = styled(MuiTextField)`
  & svg,
  input {
    color: ${({ theme }) => theme.palette.textAdvanced.dark};
  }
`;

type SubscribeToNotificationProps = {
  onSubscribe: (email: string) => void;
};

function SubscribeToNotification({ onSubscribe }: SubscribeToNotificationProps, ref) {
  const [email, setEmail] = useState('');
  const [subscriptionLoader, setSubscriptionLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    severity: AlertTypes.info,
    message: '',
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAlertMessage({ severity: AlertTypes.error, message: '' });
    try {
      if (!validateEmail(email)) {
        throw new ValidationError('invalid email');
      }
      setSubscriptionLoader(true);

      await onSubscribe(email);
      setAlertMessage({
        severity: AlertTypes.success,
        message: 'Successfully subcribed for updates',
      });
    } catch (error) {
      if (error instanceof APIError || error instanceof ValidationError) {
        console.log('error', error);
        setAlertMessage({ severity: AlertTypes.error, message: error.message });
        return;
      }
      console.log('error', error);
      setAlertMessage({
        severity: AlertTypes.error,
        message: 'Unable to subscribe. Please try again later',
      });
    } finally {
      setSubscriptionLoader(false);
    }
  };

  return (
    <Grid sx={{ py: 8, background: `${colors.GRADIENT_1} !important` }} ref={ref}>
      <Container>
        <Typography align="center" fontWeight="bold" variant="h2" color="text.secondary">
          Get Update Notification
        </Typography>
        <Box sx={{ mt: 5, px: 4 }}>
          <Grid container component="form" spacing={2} onSubmit={handleSubscribe}>
            <Grid item md={3} display={{ xs: 'none', sm: 'block' }} />
            <Grid item xs={12} md={5}>
              <TextField
                name="EMAIL"
                InputProps={{
                  startAdornment: <EmailOutlinedIcon sx={{ mr: 2 }} />,
                }}
                placeholder="Please enter your email address"
                sx={{
                  bgcolor: 'bgHighlight.main',
                  borderRadius: 1,
                  width: '100%',
                }}
                color="secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscriptionLoader}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <LoadingButton
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleSubscribe}
                loading={subscriptionLoader}
                sx={{ width: '120px', height: '52.5px', textTransform: 'capitalize', fontWeight: 600 }}
              >
                Subscribe
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, ml: 3.3 }}>
          {alertMessage.message ? (
            <Alert
              icon={<ErrorOutline sx={{ color: `${colors.DARK_RED}` }} />}
              severity="error"
              sx={{
                fontWeight: '200',
                height: '45px',
                width: '49.5%',
                backgroundColor: `${colors.LIGHT_RED} !important`,
              }}
            >
              <AlertTitle>{alertMessage.message}</AlertTitle>
            </Alert>
          ) : null}
        </Box>
      </Container>
    </Grid>
  );
}

export default forwardRef(SubscribeToNotification);
