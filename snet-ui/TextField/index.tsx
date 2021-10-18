import { TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/system";

const TextField = styled(MuiTextField)(({ theme, color }) => ({
  "& label": {
    color: theme.palette.common.black,
    // color: color ? theme.palette[color].main : theme.palette.common.black,
  },
  "& label.Mui-focused": {
    color: color ? theme.palette[color].main : theme.palette.common.black,
    // color: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.common.black,
      //   borderColor: color ? theme.palette[color].main : theme.palette.common.black,
    },
    "&:hover fieldset": {
      borderColor: color ? theme.palette[color].main : theme.palette.common.black,
    },
  },
}));

export default TextField;
