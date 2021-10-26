import { Button, Grid, SliderTrack, Typography } from "@mui/material";
import CommonLayout from "layout/CommonLayout";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "snet-ui/TextField";
import axios from "utils/Axios";
import Alert from "@mui/material/Alert";
import { API_PATHS } from "utils/constants/ApiPaths";

const categories = ["Airdrop Enquiry"];
const alertTypes: any = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};
export default function ContactUs() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [emailerror, setEmailerror] = useState({ email: "" });
  const [messageerror, setMessageerror] = useState({ message: "" });
  const [alert, setAlert] = useState({ alert: alertTypes.INFO });
  const [category, setCategory] = useState("Airdrop Enquiry");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };
  const handleusernameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };
  const handleMessageChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const sendEnquiry = async () => {
    try {
      const query = ` Message : ${message} . From ${email}`;
      const EMAIL_HOST = process.env.NEXT_PUBLIC_CONTACT_US_MAILER;
      const payload = {
        recipient: EMAIL_HOST,
        message: query,
        subject: "General enquiry ",
        notification_type: "support",
      };
      await axios.post(API_PATHS.CONTACT_US, payload);
    } catch (error: any) {
      setMessageerror({ message: error });
      setAlert({ alert: alertTypes.ERROR });
    }
  };

  const handleSubmit = () => {
    setMessageerror({});
    setAlert({});
    sendEnquiry();

    if (!message) {
      setMessageerror((prevMessageerror) => ({
        ...prevMessageerror,
        message: "Message should not be empty",
      }));
    }

    if (!email) {
      setEmailerror((prevEmailerror) => ({
        ...prevEmailerror,
        email: "Enter the valid email",
      }));
    }

    if (message !== "" && email !== "") {
      setAlert((prevAlert) => ({
        ...prevAlert,
        alert: "Message successfully send",
      }));
    } else {
      setAlert((prevAlert) => ({
        ...prevAlert,
        alert: "Error state message",
      }));
    }
  };

  return (
    <CommonLayout>
      <Box p={5}>
        <Typography align="center" color="primary" variant="h3">
          Contact Us
        </Typography>

        <Grid container sx={{ my: 3 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              color="primary"
              required
              label="Your username (Optional)"
              placeholder="Firstusername Lastusername"
              onChange={handleusernameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={emailerror.email}
              color="primary"
              required
              label="Email"
              placeholder="Enter your email here"
              onChange={handleEmailChange}
              fullWidth
              helperText={emailerror.email}
            />
          </Grid>
        </Grid>
        <TextField
          color="primary"
          label="Wallet Address (Optional)"
          placeholder="connect your wallet"
          sx={{ my: 3 }}
          fullWidth
        />
        <Select
          labelId="feedback-category-select-label"
          id="feedback-category-select"
          value={category}
          label="Category"
          onChange={handleChange}
          sx={{ my: 3 }}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <TextField
          error={messageerror.message}
          color="primary"
          required
          label="Message"
          placeholder="Please enter your comments here"
          sx={{ my: 3 }}
          fullWidth
          multiline
          rows={4}
          onChange={handleMessageChange}
          helperText={messageerror.message}
        />
        {messageerror.message !== "" && emailerror.email !== "" ? (
          <Alert severity={`info`}>{alert.alert}</Alert>
        ) : null}
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Contact
          </Button>
        </Box>
      </Box>
    </CommonLayout>
  );
}
