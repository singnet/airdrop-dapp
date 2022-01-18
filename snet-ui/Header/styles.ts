import { Theme } from "@mui/material/styles";

export const styles = (MUITheme: Theme): any => {
  return {
    header: {
      //position: "fixed",
      right: 0,
      left: 0,
      zIndex: 5,
    },
    rightMobileMenu:{
      marginLeft:'auto',
      display:'flex',
      alignItems:'center',
      '& .MuiButton-root':{
        backgroundColor:'#01A79E',
        "@media (max-width:1024px)": { padding: "4px 5px",borderRadius: '4px', },
        "@media (max-width:500px)": { padding: "4px 5px",borderRadius: '4px', height:'32px'},
        '&:hover':{
          backgroundColor:'#01A79E',
        },
        '&:active':{
          backgroundColor:'#01A79E',
        },
      },
    },
    hamburger: {
      padding: 0,
      margin: "auto",
      display: "none",
      cursor: "pointer",
      "& span": {
        width: 18,
        height: 2,
        display: "block",
        backgroundColor: '#fff',
        marginBottom: 3,
      },
      "@media (max-width:1024px)": { display: "block" },
      "@media (max-width:768px)": { margin: "0 0px 0 0" },
    },
    drawerIcon:{
      marginLeft:'auto !important',
      padding:'0px',
    },
    topNavBar:{
      background: "linear-gradient(180deg, #061753 0%, #184FA7 100%)",
      backgroundColor: "#4086FF",
      borderBottom: '3px solid #01A79E',
      boxShadow: "0 2px 6px 0 rgba(0,0,0,0.3)",
      '& .MuiToolbar-root':{
        display:'flex',
        alignItems:'center',
      },
      '& .MuiAppBar-colorPrimary':{
        background:'transparent',
        boxShadow:'none',
      },
      '& .MuiContainer-root':{
        "@media(max-width:768px)": {
          paddingLeft:'0px',
          paddingRight:'0px',
         },
      },
    },
    navlinks:{
      marginLeft:'auto',
    },
    rightButton:{
      marginLeft:'50px'
    },
    accountButton:{
      padding:'0px',
      '& svg':{
        "@media(max-width:768px)": {
          width:'24px',
          height:'24px',
        },
      },
      '& .MuiTypography-root':{
        fontSize:'14px',
      },
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
    link:{
      color: '#FFFFFF',
      fontFamily: 'Montserrat',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '19px',
    },
    wrapper: {
      boxSizing: "border-box",
      maxWidth: 1550,
     // padding: "15px 60px",
     padding:7,
      margin: "0 auto",
      "& > div": {
        alignItems: "center",
        "@media(max-width: 1023px)": { justifyContent: "space-between" },
      },
      "@media(max-width: 1023px)": { padding: "15px 12px" },
    },
    addBgColor: {
      background: "linear-gradient(180deg, #061753 0%, #184FA7 100%)",
      backgroundColor: "#4086FF",
      boxShadow: "0 2px 6px 0 rgba(0,0,0,0.3)",
    },
    customDrawer:{
      '& .MuiDrawer-paper':{
        background: 'linear-gradient(180deg, #061753 0%, #184FA7 100%)',
        '& ul':{
          '& li':{
            '& a':{
              color:'#fff',
            },
          },
        },
      },
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      "& h1": {
        margin: 0,
        lineHeight: 0,
        "& a": { textDecoration: "none" },
        "& span": {
          "&:before": { fontSize: 45 },
        },
      },
    },
    logoAnchor: {
      display: "inline-block",
      "& img": { 
        width: 180,
        "@media(max-width:400px)": { width: 140, },
      },
    },
    navigationSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& nav": {
        "& > ul": {
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          "& > li": {
            paddingLeft: 40,
            listStyle: "none",
            "& a": {
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              color: "#FAFAFA",
              fontSize: 16,
              lineHeight: "20px",
              textDecoration: "none",
            },
            "&:first-of-type": { paddingLeft: 0 },
          },
        },
      },
      ["& li[data-nav-link='Products']"]: {
        "& > div": {
          "& > div": {
            "& li": {
              width: "50%",
              display: "inline-block",
              verticalAlign: "top",
              "&:last-of-type": {
                borderTop: "1px solid #D6D6D6",
                padding: "16px 0 18px",
                "& a": {
                  width: 306,
                  padding: "11px 15px 12px 10px",
                  border: "1px solid #D6D6D6",
                  borderRadius: 4,
                },
              },
              "&:nth-last-child(2)": {
                boxSizing: "border-box",
                borderTop: "1px solid #D6D6D6",
                padding: "16px 8px 18px",
                "& a": {
                  width: 299,
                  padding: "11px 15px 12px 10px",
                  border: "1px solid #D6D6D6",
                  borderRadius: 4,
                },
              },
            },
          },
        },
      },
      ["& li[data-nav-link='Community']"]: {
        "& > div": {
          "&:not(first-of-type)": { border: "none" },
          "& h5": {
            borderTop: "1px solid #D6D6D6",
            "&:first-of-type": { borderBottom: "1px solid #D6D6D6" },
          },
          "& > div": {
            borderTop: "none",
            "& ul": {
              "& li": {
                width: "50%",
                "& a": { boxSizing: "border-box" },
              },
            },
          },
        },
      },
      "@media(max-width:1023px)": { display: "none" },
    },
    megaMenuContainer: {
      width: 628,
      borderRadius: 4,
      display: "none",
      position: "absolute",
      top: 60,
      left: "50%",
      backgroundColor: "#fff",
      boxShadow:
        "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
      transform: "translateX(-50%)",
      cursor: "default",
      "& > div": { borderTop: "1px solid #D6D6D6" },
      "& h5": {
        padding: "16px 24px",
        margin: 0,
        color: "black",
        fontSize: 14,

        fontWeight: 600,
        lineHeight: "18px",
        textTransform: "uppercase",
      },
      "& a": {
        width: 309,
        padding: "11px 14px 12px 16px",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "#fafafa",
          "& h6": { color: "black" },
          "& span": {
            color: "black",
            fontWeight: "bold",
          },
        },
      },
    },
    megaMenues: {
      "& ul": {
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        "& li": {
          paddingLeft: 0,
          listStyle: "none",
          "& a": { textDecoration: "none" },
        },
      },
    },
    megaMenuContent: {
      marginLeft: 9,
      "& h6": {
        margin: 0,
        color: "black",
        fontSize: 16,

        fontWeight: 500,
        letterSpacing: 0.5,
        lineHeight: "20px",
      },
      "& span": {
        color: "black",
        fontSize: 12,

        letterSpacing: 0.38,
        lineHeight: "16px",
      },
    },
    getInvolveContainer: {
      "& ul": {
        padding: "0 0 19px 45px",
        margin: 0,
        display: "flex",
        "& li": {
          width: "auto !important",
          padding: 0,
          fontSize: 16,

          letterSpacing: 0.5,
          lineHeight: "28px",
          listStyle: "none",
          "& a": {
            width: "auto",
            padding: 0,
            color: "#000 !important",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#4086ff !important",
            },
          },
          "&:first-of-type": { marginRight: 40 },
        },
      },
    },
    followUsContainer: {
      paddingBottom: 24,
      "& ul": {
        padding: 0,
        margin: 0,
        display: "flex",
        "& li": {
          width: "auto !important",
          padding: 0,
          marginLeft: 45,
          listStyle: "none",
          "& a": {
            width: "auto",
            padding: 0,
            display: "inline",
            opacity: 1,
            "& svg": {
              color: "#4a4a4a",
              fontSize: 24,
            },
            "&:hover": {
              "& svg": { color: "#4086ff" },
            },
          },
        },
      },
    },
    subMenuContainer: {
      "& h5": {
        padding: "16px 24px",
        margin: 0,
        color: "black",
        fontSize: 14,

        fontWeight: 600,
        lineHeight: "18px",
        textTransform: "uppercase",
        "&:first-of-type": { display: "none" },
      },
    },
    subMenues: {
      "& > ul": {
        padding: 0,
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        "& > li": {
          listStyle: "none",
          "& > a": {
            boxSizing: "border-box",
            width: 309,
            padding: "11px 14px 12px 16px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "& img": { display: "none " },
            "& > div": {
              "& h6": {
                margin: 0,
                color: "black",
                fontSize: 16,

                letterSpacing: 0.5,
                lineHeight: "20px",
              },
              "& > span": {
                color: "black",
                fontSize: 12,
                letterSpacing: 0.38,
                lineHeight: "16px",
              },
            },
            "&:hover": {
              "& h6": { color: "black" },
              "& span": { color: "black" },
            },
          },
        },
      },
    },
    active: { display: "block !important" },
    userActionSection: {
      display: "flex",
      justifyContent: "flex-end",
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
      "@media(max-width:575px)": { display: "none" },
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
  };
};
