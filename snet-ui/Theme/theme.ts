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
    note?: { light?: string; main: string; dark?: string; contrastText?: string };
    redtext?: { light?: string; main: string; dark?: string; contrastText?: string };
    bgcolor?: { light?: string; main: string; dark?: string; contrastText?: string };
    bordercolor?: { light?: string; main: string; dark?: string; contrastText?: string };
  }
}

export const lightTheme = createTheme({
  palette: {
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
    text:{
      secondary:"#fff",
      primary:"#000",
    
    
    },
    bgBox:{
      main:"#603E95",
    },
    bgtext:{
      main:"#062362",
    },
    note:{
      main:"#CBDDFD",
    },
    redtext:{
      main:"#A70147",
    },
    bgcolor:{
      main:"#FDE5E8",
    },
    bordercolor:{
      main:"#E67381",
    },
    
    
  },
});
