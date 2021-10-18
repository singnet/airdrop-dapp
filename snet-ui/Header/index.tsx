import React, { useMemo } from "react";
import { WithStyles, withStyles } from "@mui/styles";

import Grid from "@mui/material/Grid";
// import Image from "next/image";
import MobileHeader from "./MobileHeader";
import NavBar from "./NavBar";
<<<<<<< HEAD
import AirdropLogo from "public/images/AirdropLogo.png";
=======
// import AirdropLogo from "snet-ui/images/AirdropLogo.png";
>>>>>>> 4ebd92cfff04a25a36f74445e73cdef8322abfb8
import { styles } from "./styles";
import { navData, userActions } from "snet-ui/constants/Header";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

type HeaderProps = WithStyles<typeof styles> & {
  account?: string;
  onConnectWallet: () => void;
};

const Header = ({ classes, onConnectWallet, account }: HeaderProps) => {
  const truncatedAddress = useMemo(() => {
    if (!account) return "";
    return account.slice(0, 4) + "..." + account.slice(-4);
  }, [account]);
  return (
    <div className={`${classes.header} ${classes.addBgColor}`}>
      <div className={classes.wrapper}>
        <Grid container>
          <Grid item md={3} className={classes.logoSection}>
            <MobileHeader navigationData={navData} userActions={userActions} />
            <h1>
              <a href="/" className={classes.logoAnchor}>
                <img src="/AirdropLogo.png" alt="SingularityNET" />
              </a>
            </h1>
          </Grid>
          <Grid item md={6} className={classes.navigationSection}>
            <NavBar
              navigationData={navData}
              onConnectWallet={onConnectWallet}
            />
          </Grid>
          <Grid
            item
            md={3}
<<<<<<< HEAD
            className={classes.navigationSection}
            sx={{ justifyContent: "right" }}
          >
            <Button
              onClick={onConnectWallet}
              color="secondary"
              variant="contained"
            >
              Connect Wallet
            </Button>
=======
            // className={classes.navigationSection}
            sx={{ justifyContent: "right", color: "common.white" }}
          >
            {account ? (
              <>
                <AccountCircleIcon />
                <Typography color="textAdvanced.secondary" component="span">
                  {truncatedAddress}
                </Typography>
              </>
            ) : (
              <Button onClick={onConnectWallet} color="secondary" variant="contained">
                Connect Wallet
              </Button>
            )}
>>>>>>> 4ebd92cfff04a25a36f74445e73cdef8322abfb8
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(Header);
