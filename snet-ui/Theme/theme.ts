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
    bgGradient:{
      main:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      //main:"#000",
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
    
    
  },
});
