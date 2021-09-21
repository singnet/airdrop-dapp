// export const ;
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../Theme/theme";

addDecorator((story) => <ThemeProvider theme={lightTheme}>{story()}</ThemeProvider>);

export const parameters = {
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (b[1].kind === "Welcome") {
        return 1;
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
};
