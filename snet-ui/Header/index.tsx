import React, { useMemo } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import NavBar from './NavBar';
import { styles } from './styles';
import { navData, userActions } from '../../snet-ui/constants/Header';
import { Button as MuiButton, Container, useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import AccountModal from '../Blockchain/AccountModal';
import { AppBar, Toolbar } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import DrawerComponent from './DrawerComponent';
import { useWalletHook } from '../../hooks/WalletConnectHook';

type HeaderProps = WithStyles<typeof styles> & {
  account?: string;
  onDisconnect: () => void;
};

const Button = styled(MuiButton)`
  text-transform: capitalize;
`;

const Header = ({ classes, onDisconnect, account }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { initializeConnection, address, getWalletAddress } = useWalletHook();

  const open = Boolean(anchorEl);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnectWallet = () => {
    onDisconnect();
    handleUserMenuClose();
  };

  const onConnectWallet = async () => {
    try {
      await initializeConnection();
    } catch (error) {
      console.error(error);
    }
  };

  const truncatedAddress = useMemo(async () => {
    const wallet = await getWalletAddress();
    return wallet ? wallet.slice(0, 6) + '...' : '';
  }, [address]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1023));
  return (
    <>
      <div className={classes.topNavBar}>
        <Container sx={{ pb: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" className={classes.logo}>
                <a href="/" className={classes.logoAnchor}>
                  <img src="/AppLogo.png" alt="SingularityNET" />
                </a>
              </Typography>
              {isMobile ? (
                <DrawerComponent
                  onConnectWallet={onConnectWallet}
                  navigationData={navData}
                  userActions={userActions}
                  account={address}
                />
              ) : (
                <div className={classes.navlinks}>
                  <div className={classes.navigationSection}>
                    <NavBar navigationData={navData} onConnectWallet={onConnectWallet} />
                    {address ? (
                      <>
                        <div className={classes.rightButton}>
                          <Button aria-expanded={open ? 'true' : undefined} onClick={handleOpenUserMenu}>
                            <AccountCircleIcon fontSize="large" sx={{ color: 'common.white' }} />
                            <Typography color="textAdvanced.secondary" component="span" sx={{ m: 1 }}>
                              {truncatedAddress}
                            </Typography>
                          </Button>
                          {/* <Menu anchorEl={anchorEl} open={open}>
                      <MenuItem onClick={handleDisconnectWallet}>Signout</MenuItem>
                    </Menu> */}
                          <AccountModal
                            account={address}
                            open={open}
                            setOpen={handleUserMenuClose}
                            changeAccount={onConnectWallet}
                          />
                        </div>
                      </>
                    ) : (
                      <div className={classes.rightButton}>
                        <Button
                          onClick={onConnectWallet}
                          color="secondary"
                          variant="contained"
                          sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Container>
      </div>
    </>
  );
};

export default withStyles(styles)(Header);
