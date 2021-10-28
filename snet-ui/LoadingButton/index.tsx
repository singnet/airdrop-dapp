import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { alpha, styled } from "@mui/system";
import { ButtonProps } from "@mui/material/Button";

const LoadingButton = styled(MuiLoadingButton)<ButtonProps>(({ theme, color }) => ({
  backgroundColor: color ? theme.palette[color].main : theme.palette.primary.main,

  ":disabled": {
    backgroundColor: alpha(color ? theme.palette[color].main : theme.palette.primary.main, 0.5),
  },
}));

export default LoadingButton;
