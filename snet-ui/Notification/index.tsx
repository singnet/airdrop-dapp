import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";

import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { Stack } from "@mui/material";

export default function CustomizedTextField() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ background: "linear-gradient(180deg, #061753 0%, #184FA7 100%)" }}
    >
      <Typography
        align="center"
        fontWeight="bold"
        variant="h6"
        color="text.secondary"
      >
        Get Notification Updates
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Box component="form" name="mc-embedded-subscribe-form">
          <Stack spacing={2} direction="row">
            <TextField
              name="EMAIL"
              InputProps={{ startAdornment: <EmailIcon /> }}
              label="Please enter your email address"

              //InputProps={{ startAdornment: <EmailIcon /> }}
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
    </Box>
  );
}

//export default withStyles(styles)(HowItWorks);
