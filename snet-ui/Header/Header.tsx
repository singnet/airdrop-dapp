import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import WalletModal from "snet-ui/Blockchain/WalletModal";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openWallet, setWalletStatus] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMetamaskClick = () => {
    setWalletStatus(true);
  };

  const onWalletConnect = () => {
    setWalletStatus(true);
  };

  return (
    <>
      <WalletModal open={openWallet} setOpen={setWalletStatus} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography sx={{ minWidth: 100 }}>NuNet Sites</Typography>
        <Typography sx={{ minWidth: 100 }}>SingularityNET Airdrops</Typography>
        <Typography sx={{ minWidth: 100 }}>Contact Us</Typography>
        <Button onClick={handleClick} size="small" sx={{ ml: 2 }}>
          Connect Wallet
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onMetamaskClick}>
          <Avatar /> Metamask
        </MenuItem>
        <MenuItem onClick={onWalletConnect}>
          <Avatar /> Wallet Connect
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
