import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Theme } from "@mui/system";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

type AccountModalProps = {
  account: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  changeAccount: () => void;
};

let copiedStateTimeout;

export default function AccountModal({ account, open, setOpen, changeAccount }: AccountModalProps) {
  const [copied, setCopied] = useState(false);
  const [showChangebutton, setShowchangeButton] = useState(false);
  const {connector} = useWeb3React();

  const theme = useTheme();
  const matchesSmallDevices = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if(connector instanceof WalletConnectConnector) {
      setShowchangeButton(true);
    }
  }, [connector]);  

  const handleClose = () => setOpen(false);

  const handleCopyAddressToClipboard = () => {
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(account);
      setCopied(true);
      if (copiedStateTimeout) {
        clearTimeout(copiedStateTimeout);
      }
      copiedStateTimeout = setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  const handleViewOnExplorer = () => {
    let url;
    if (process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID === "3") {
      url = `https://ropsten.etherscan.io/address/${account}`;
    } else if (process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID === "1") {
      url = `https://etherscan.io/address/${account}`;
    }
    window.open(url, "_blank");
  };

  const disconnectWallet = async () => {
    try {
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector?.close();
      }   
      changeAccount(); 
    }
    catch (e) {
      console.log('Error on deactivatin', e);
    }
  }


  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography color="primary.main" variant="h5">
            Account
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme: Theme) => theme.palette.textAdvanced.dark,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ py: 4 }}>
          <Box sx={{ borderColor: "common.black", borderRadius: 2, border: "1px solid", p: 3 }}>
            <Box>
              <Typography noWrap component="span">
                {matchesSmallDevices ? account : `${account.slice(0, 16)}...`}
              </Typography>
            </Box>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button sx={{ textTransform: "lowercase" }} onClick={handleViewOnExplorer}>
                  <Typography component="span"> open in explorer &nbsp; </Typography> <OpenInNewIcon />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} onClick={handleCopyAddressToClipboard}>
                <Button sx={{ textTransform: "lowercase" }} disabled={copied}>
                  <Typography component="span"> {copied ? "copied" : "copy address"} &nbsp;</Typography>
                  {copied ? <DoneIcon /> : <ContentCopyIcon />}
                </Button>
              </Grid>
            </Grid>
            {showChangebutton? <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 3 }}>
              <Button onClick={disconnectWallet} variant="outlined" color="secondary">
                change
              </Button>
            </Box>: null}            
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
