import React, { Fragment, useState } from "react";
import { WithStyles, withStyles } from "@mui/styles";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { styles } from "./styles";
import Typography from "@mui/material/Typography";

type NavbarProps = WithStyles<typeof styles> & {
  type?: string;
  navigationData: any;
  onConnectWallet: () => void;
};

const NavBar = ({ navigationData, classes, type, onConnectWallet }: NavbarProps) => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  const onMenuClick = (id: number) => {
    setActiveNavItem(id);
  };

  if (activeNavItem) {
    window.addEventListener("click", (event: any) => {
      if (event.target.id !== "navLink") {
        setActiveNavItem(0);
      }
    });
  } else {
    //window.removeEventListener("click", () => {});
  }

  const handlePopupClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <nav>
      <ul>
        {navigationData.map((navItem: any) => (
          <li data-nav-link={navItem.name} key={navItem.name}>
            {type === "mobile" ? (
              <span>{navItem.name}</span>
            ) : (
              <a
                href={navItem.url}
                title={navItem.name}
                className={classes.dropDown}
                id="navLink"
                onClick={() => onMenuClick(navItem.id)}
                target={navItem.external ? "_blank" : ""}
                rel={navItem.external ? "noreferrer noopener" : ""}
              >
                <Typography variant="menu">
                  {navItem.name}
                  {navItem.sections ? <ArrowDropDownIcon /> : null}
                </Typography>
              </a>
            )}
            <div
              className={`${type === "mobile" ? classes.subMenuContainer : classes.megaMenuContainer} ${
                activeNavItem === navItem.id ? classes.active : null
              }`}
              onClick={handlePopupClick}
            >
              {navItem.sections &&
                navItem.sections.map((item: any) => (
                  <Fragment key={item.section_name}>
                    <h5>{item.section_name}</h5>
                    {item.section_type === "megamenu" ? (
                      <div className={type === "mobile" ? classes.subMenues : classes.megaMenues}>
                        <ul>
                          {item.section_elements.map((subMenue: any) => (
                            <li key={subMenue.section_name}>
                              <a
                                href={subMenue.section_url}
                                title={subMenue.section_name}
                                target={subMenue.external ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                              >
                                {subMenue.section_icon ? (
                                  <img src={subMenue.section_icon} alt={subMenue.section_name} />
                                ) : null}
                                <div className={classes.megaMenuContent}>
                                  <h6>{subMenue.section_name}</h6>
                                  <span>{subMenue.section_description}</span>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {item.section_type === "default" ? (
                      <div className={classes.getInvolveContainer}>
                        <ul>
                          {item.section_elements.map((subMenue: any) => (
                            <li key={subMenue.section_name}>
                              <a
                                href={subMenue.section_url}
                                title={subMenue.section_name}
                                target={subMenue.external ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                              >
                                {subMenue.section_name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {item.section_type === "social" ? (
                      <div className={classes.followUsContainer}>
                        <ul>
                          {item.section_elements.map((socialLink: any) => (
                            <li className={classes.socialIconsLink} key={socialLink.section_name}>
                              <a
                                href={socialLink.section_url}
                                title={socialLink.section_name}
                                className={classes.socialIcon}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <socialLink.section_icon />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </Fragment>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default withStyles(styles)(NavBar);
