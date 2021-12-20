import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { SupportedChainId } from "./connectors";

type UnsupportedNetworkModalProps = {
  open: boolean;
  supportedChainId: number;
  //   onClose: () => void;
};

export default function UnsupportedNetworkModal({ open, supportedChainId }: UnsupportedNetworkModalProps) {
  return (
    <Dialog
      open={open}
      //   onClose={onClose}
    >
      <DialogTitle>
        <Typography color="primary.main" variant="h5">
          Unsupported Network.
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ py: 4 }}>
        <Typography color="text.primary" variant="priority">
          Please Switch to Ethereum
          <Typography color="primary.main" component="span" variant="priority">
            &nbsp; {SupportedChainId[supportedChainId]}&nbsp;
          </Typography>
          Network
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
