import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type Props = {
  onConnectWallet: () => void;
}

const Header = ({onConnectWallet}:Props) => {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [openWallet, setWalletStatus] = React.useState<boolean>(false);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const onMetamaskClick = () => {
  //   setWalletStatus(true);
  // };

  // const onWalletConnect = () => {
  //   setWalletStatus(true);
  // };

  return (
    <>
      {/* <WalletModal open={openWallet} setOpen={setWalletStatus} /> */}
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
        <Button onClick={onConnectWallet} size="small" sx={{ ml: 2 }}>
          Connect Wallet
        </Button>
      </Box>
    </>
  );
};

export default Header;
