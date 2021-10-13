import React from "react";
import { WithStyles, withStyles } from "@mui/styles";

import Grid from "@mui/material/Grid";
import Image from "next/image";
import MobileHeader from "./MobileHeader";
import NavBar from "./NavBar";
import AirdropLogo from "public/images/AirdropLogo.png";
import { styles } from "./styles";
import { navData, userActions } from "snet-ui/constants/Header";
import Button from "@mui/material/Button";

type HeaderProps = WithStyles<typeof styles> & {
  onConnectWallet: () => void;
};

const Header = ({ classes, onConnectWallet }: HeaderProps) => {
  return (
    <div className={`${classes.header} ${classes.addBgColor}`}>
      <div className={classes.wrapper}>
        <Grid container>
          <Grid item md={3} className={classes.logoSection}>
            <MobileHeader navigationData={navData} userActions={userActions} />
            <h1>
              <a href="/" className={classes.logoAnchor}>
                <Image src={AirdropLogo} alt="SingularityNET" />
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(Header);
