import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import GradientBox from "snet-ui/GradientBox";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { Stack } from "@mui/material";
import { OutlinedInput } from "@material-ui/core";

export default function CustomizedTextField() {
  return (
    <GradientBox>
      <Typography
        align="center"
        fontWeight="bold"
        variant="h6"
        color="text.secondary"
      >
        Get Notification Updates
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 2,
          pb: 3,
        }}
      >
        <Box
          component="form"
          name="mc-embedded-subscribe-form"
          //sx={{ bgcolor: "background.paper" }}
        >
          <Stack spacing={2} direction="row">
            <TextField
              name="EMAIL"
              InputProps={{ startAdornment: <EmailIcon /> }}
              sx={{ bgcolor: "background.paper", width: "40ch" }}
              placeholder="Please enter your email address"
            />

            <Button
              type="submit"
              children="subscribe"
              color="info"
              variant="contained"
            />
          </Stack>
        </Box>
      </Box>
    </GradientBox>
  );
}

//export default withStyles(styles)(HowItWorks);
