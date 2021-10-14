import { createStyles } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const styles = (MUITheme: Theme) =>
  createStyles({
    hamburger: {
      padding: 10,
      margin: "0 39px 0 23px",
      display: "none",
      cursor: "pointer",
      "& span": {
        width: 18,
        height: 2,
        display: "block",
        backgroundColor: MUITheme.palette?.text?.primary,
        marginBottom: 3,
      },
      "@media (max-width:1024px)": { display: "block" },
      "@media (max-width:768px)": { margin: "0 25px 0 0" },
    },
    mobileNavContainer: {
      display: "flex",
      alignItems: "center",
      position: "fixed",
      top: 0,
      right: -20,
      bottom: 0,
      left: 0,
      zIndex: 1,
      backgroundColor: "#051120",
      boxShadow: "0 2px 6px 0 rgb(0 0 0 / 30%)",
      "@media (min-width:1024px)": { display: "none" },
    },
    closeMenuIcon: {
      color: MUITheme.palette?.text?.primary,
      position: "absolute",
      top: 30,
      right: 40,
      cursor: "pointer",
    },
    mobileNavigation: {
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "10px 0 10px 29px",
      overflow: "auto",
      textAlign: "left",
      "& nav": {
        "& > ul": {
          "& > li": {
            "&:nth-child(2)": {
              "& > div": {
                "& > div": {
                  "&:nth-child(4)": {
                    "& ul": { marginLeft: 40 },
                    "& a": {
                      color: "#fff !important",
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: `${MUITheme.palette?.text?.primary} !important`,
                      },
                    },
                  },
                  "&:nth-child(6)": { paddingBottom: 0 },
                },
              },
            },
          },
        },
      },
      "& ul": {
        padding: 0,
        margin: 0,
        "& li": {
          padding: "10px 0",
          listStyle: "none",
          "& > span": {
            color: MUITheme.palette?.text?.primary,
          },
        },
      },
      "@media(min-width: 1024px)": { display: "none" },
    },
    subMenues: {
      "& li": {
        paddingLeft: "0 !important",
        margin: "0 0 0 29% !important",
        "&:first-of-type": { border: "none" },
        "&:last-of-type": {
          paddingBottom: 9,
        },
        "& a": {
          padding: "13px 0 13px 33px",
          fontSize: 22,
        },
        "&:first-of-type a": {
          paddingLeft: 0,
          color: MUITheme.palette?.text?.primary,
        },
        "&:nth-child(2) a": { paddingTop: 0 },
      },
    },
    mobileUserAction: {
      display: "none",
      "& ul": {
        padding: 0,
        margin: 0,
        display: "flex",
        "& li": {
          listStyle: "none",
          "& a": {
            color: "#fff",
            textDecoration: "none",
          },
        },
      },
      "@media(max-width:575px)": { display: "block" },
    },
    signUpLink: {
      padding: "6px 18px",
      borderRadius: 4,
      marginLeft: 32,
      backgroundColor: "#4086ff",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "16px",
      letterSpacing: 1.25,
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#005ACB",
        transition: "all .5s linear",
      },
      "& span": {
        "@media(max-width:768px)": { display: "none" },
      },
    },
  });
