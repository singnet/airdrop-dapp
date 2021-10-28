import { AlertColor } from "@mui/material";

export const AlertTypes: { [key in AlertColor]: AlertColor } = {
  error: "error",
  warning: "warning",
  info: "info",
  success: "success",
};
