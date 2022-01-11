import * as React from 'react';
import { SxProps, Theme } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { SUPPORTED_WALLETS } from './Wallet';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEagerConnect } from './web3Hooks';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const WalletButton = ({ wallet, handleConnect, imgSrc }) => (
  <ButtonBase
    onClick={() => handleConnect(SUPPORTED_WALLETS[wallet].connector)}
  >
    {/* sx={{
                "&:hover": {
                  bgcolor: "bgFocus.main",
                },
              }} */}
    <Paper
      elevation={2}
      sx={{
        px: 3,
        '&:hover': {
          bgcolor: 'bgFocus.main',
        },
      }}
    >
      <Box
        sx={{
          px: 5,
          pb: 3,
          pt: 7,
        }}
      >
        <img alt="" src={imgSrc} width="100" height="100" />
      </Box>
      <Typography
        color="primary.main"
        sx={{
          '&:hover': {
            color: 'secondary.main',
          },
        }}
      >
        {SUPPORTED_WALLETS[wallet].name}
      </Typography>
      <Typography color="textAdvanced.dark">
        {SUPPORTED_WALLETS[wallet].description}
      </Typography>
    </Paper>
  </ButtonBase>
);

export default function WalletModal({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);
  const {
    active,
    account,
    connector,
    activate,
    error,
    setError,
    library,
  } = useWeb3React();
  useEagerConnect();

  const handleConnect = async (connector: AbstractConnector | undefined) => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    console.log('connecting to the wallet', name);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    if (connector) {
      activate(connector, undefined, true)
        .then(() => {
          console.log('activate promise resolved');
          setOpen(false);
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); 
            // a little janky...can't use setError because the connector isn't set
          } else {
            console.log('connection error', error);
            setError(error);
            // setPendingError(true)
          }
        });
    }

    if (account) {
      console.log('account connected');
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography color="primary.main" variant="h5">
            Connect to a wallet
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme: Theme) => theme.palette.textAdvanced.dark,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <WalletButton
                wallet={SUPPORTED_WALLETS.METAMASK.id}
                handleConnect={handleConnect}
                imgSrc="/Metamask.png"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <WalletButton
                wallet={SUPPORTED_WALLETS.WALLET_CONNECT.id}
                handleConnect={handleConnect}
                imgSrc="/Walletconnect.svg"
              />
            </Grid>
          </Grid>

          <Typography
            component="p"
            color="textAdvanced.dark"
            align="center"
            variant="normal"
            sx={{ mt: 3 }}
          >
            By connecting a wallet, you agree to our
            <Typography
              component="a"
              href="https://public.singularitynet.io/terms_and_conditions.html"
              color="secondary.main"
              variant="link"
              pl={1}
            >
              Terms and Conditions
            </Typography>
          </Typography>
          {/* <List sx={{ pt: 0 }}>
            {Object.entries(SUPPORTED_WALLETS).map(([walletKey, wallet]) => (
              <ListItem button key={wallet.name} onClick={() => handleConnect(wallet.connector)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={wallet.name} />
              </ListItem>
            ))}
          </List> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
