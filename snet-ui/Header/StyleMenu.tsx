import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { withStyles, WithStyles } from "@mui/styles";
import CaretIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";

import { styles } from "./styles";
import MUILink from "@mui/material/Link";

type StyledMenuProps = WithStyles<typeof styles> & {
  label: string;
  list: any;
};

const StyledMenu = ({ classes, label, list }: StyledMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <div onClick={handleOpen}>
        <Button className={classes.button}>{label}</Button>
        <CaretIcon />
      </div>
      <Menu anchorEl={anchorEl} id="simple-menu" open={Boolean(anchorEl)} onClose={handleClose}>
        {list.map((item: any) => (
          <MenuItem key={item.label} className={classes.menuItem}>
            <MUILink href={item.link} title={item.label} target="_blank" rel="noopener">
              {item.label}
            </MUILink>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

StyledMenu.propTypes = {
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
      newTab: PropTypes.bool,
    })
  ),
};

export default withStyles(styles)(StyledMenu);
