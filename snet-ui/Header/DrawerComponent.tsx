import React, { useMemo, useState } from 'react';
import { navData, userActions } from '../../snet-ui/constants/Header';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { styles } from './styles';
import { WithStyles, withStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import AccountModal from 'snet-ui/Blockchain/AccountModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type DrawerComponentProps = WithStyles<typeof styles> & {
    account?: string;
    navigationData: any;
    userActions: any;
    onConnectWallet: () => void;
  };
const DrawerComponent = ({
  classes,
  navigationData,
  userActions,
  account,
  onConnectWallet,
}: DrawerComponentProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const truncatedAddress = useMemo(() => {
    if (!account) return '';
    return `${account.slice(0, 4)}...${account.slice(-4)}`;
  }, [account]);
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className={classes.customDrawer}
      >
        <List>
          {
            navData.map((navItem, index) => (
              <ListItem onClick={() => setOpenDrawer(false)} key={index}>
                <ListItemText>
                  <a
                    href={navItem.url}
                    title={navItem.name}
                    target="_blank"
                    rel="noreferrer"
                  >{navItem.name}</a>
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
      <div className={classes.rightMobileMenu}>
        {account ? (
          <>
            <Button
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserMenu}
              className={classes.accountButton}
            >
              <AccountCircleIcon
                fontSize="large"
                sx={{ color: 'common.white' }}
              />
              <Typography
                color="textAdvanced.secondary"
                component="span"
                sx={{ m: 1 }}
              >
                {truncatedAddress}
              </Typography>
            </Button>
            <AccountModal
              account={account}
              open={open}
              setOpen={handleUserMenuClose}
              changeAccount={onConnectWallet}
            />
            <IconButton className={classes.drawerIcon} onClick={() => setOpenDrawer(!openDrawer)}>
              <div className={classes.hamburger}>
                <span />
                <span />
                <span />
              </div>
            </IconButton>
          </>
        ) : (
          <Button
            onClick={onConnectWallet}
            color="secondary"
            variant="contained"
            sx={{ textTransform: 'capitalize', fontWeight: 600 }}
          >
            Connect Wallet
          </Button>
        )}

      </div>

    </>
  );
};
export default withStyles(styles)(DrawerComponent);
