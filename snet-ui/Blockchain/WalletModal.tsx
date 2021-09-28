import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SxProps, Theme } from "@mui/system";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import { SUPPORTED_WALLETS } from "./Wallet";

const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function WalletModal({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Connect to a wallet</DialogTitle>
        <List sx={{ pt: 0 }}>
          {Object.entries(SUPPORTED_WALLETS).map(([walletKey, wallet]) => (
            <ListItem button key={wallet.name}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={wallet.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
