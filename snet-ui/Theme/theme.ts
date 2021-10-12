import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }

  interface TypeBackground {
    highlight: string;
  }
  interface PaletteOptions {
    bgHighlight?: { light?: string; main: string; dark?: string; contrastText?: string };
    bgGradient?: { light?: string; main: string; dark?: string; contrastText?: string };
    bgBox?: { light?: string; main: string; dark?: string; contrastText?: string };
    bgtext?: { light?: string; main: string; dark?: string; contrastText?: string };
  }
}

declare module "@mui/material/styles/createTypography" {
  interface Typography {
    priority: React.CSSProperties;
    normal: React.CSSProperties;
    small: React.CSSProperties;
    link: React.CSSProperties;
    label: React.CSSProperties;
    menu: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface TypographyOptions {
    priority: React.CSSProperties;
    normal?: React.CSSProperties;
    small?: React.CSSProperties;
    link?: React.CSSProperties;
    label?: React.CSSProperties;
    menu?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    priority: true;
    normal: true;
    small: true;
    link: true;
    label: true;
    menu: true;
  }
}

export const lightTheme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#01A79E",
    },
    bgHighlight: {
      main: "#f2f6fe",
    },

    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      secondary: "#F4F8FF",
      primary: "#000",
    },
    bgBox: {
      main: "#603E95",
    },
    bgtext: {
      main: "#062362",
    },
  },
  typography: {
    h1: {
      fontSize: "48px",
      fontWeight: 500,
      lineHeight: "56px",
      letterSpacing: "-1px",
    },
    h2: {
      fontSize: "32px",
      fontWeight: "bold",
      lineHeight: "56px",
      letterSpacing: "-0.67px",
    },
    h3: {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: 0,
    },
    h4: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: 0,
    },
    priority: {
      fontSize: "18px",
      lineHeight: "29px",
      letterSpacing: 0,
    },
    normal: {
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: 0,
    },
    small: {
      fontSize: "10px",
      lineHeight: "13px",
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
});
