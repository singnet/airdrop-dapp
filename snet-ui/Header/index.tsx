import React from "react";
import { WithStyles, withStyles } from "@mui/styles";

import Grid from "@mui/material/Grid";
import Image from "next/image";
import MobileHeader from "./MobileHeader";
import NavBar from "./NavBar";
//import {theme } from "snet-ui/Theme/theme";
import AirdropLogo from "snet-ui/images/AirdropLogo.png";
import { styles } from "./styles";
import { navData, userActions } from "snet-ui/constants/Header";

type HeaderProps = WithStyles<typeof styles> & {
  fixHeader: boolean;
  onConnectWallet: () => void;
};

const Header = ({ classes, fixHeader, onConnectWallet }: HeaderProps) => {
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
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(Header);
