import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from "@mui/lab";
import { alpha, styled } from "@mui/system";

const LoadingButton = styled(MuiLoadingButton)<LoadingButtonProps>(({ theme, color }) => ({
  backgroundColor: `${color ? theme.palette[color].main : theme.palette.primary.main} !important`,
  fontWeight: 600,
  ":disabled": {
    backgroundColor: `${alpha(color ? theme.palette[color].main : theme.palette.primary.main, 0.5)} !important`,
    color: "#00140042 !important",
    padding: "6px 16px !important",
  },
  color: "#fff !important",
  borderRadius: "4px !important",
  padding: "6px 16px !important",
}));

export default LoadingButton;
