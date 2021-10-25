import { Button, Grid, SliderTrack, Typography } from "@mui/material";
import CommonLayout from "layout/CommonLayout";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "snet-ui/TextField";
import axios from "utils/Axios";
import Alert from "@mui/material/Alert";

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
  const [name, setName] = useState("");

  const [info, setInfo] = useState({
    email: "",
    message: "",
    alert: alertTypes.INFO,
  });
  const [category, setCategory] = useState("Airdrop Enquiry");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };
  const handleMessageChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const sendEnquiry = async () => {
    try {
      const query = ` Message : ${message} . Email ${email}`;
      const payload = {
        recipient: "info@singularitynet.io",
        message: query,
        subject: "General enquiry ",
        notification_type: "support",
      };
      await axios.post(
        "https://li8mklzc0h.execute-api.us-east-1.amazonaws.com/mt-v2/email",
        payload
      );
    } catch (error: any) {
      setInfo({ message: error, alert: alertTypes.ERROR });
    }
  };

  const handleSubmit = () => {
    setInfo({});
    sendEnquiry();

    if (message === "") {
      setInfo((prevError) => ({
        ...prevError,
        message: "Message should not be empty",
      }));
    }

    if (!email) {
      setInfo((prevError) => ({
        ...prevError,
        email: "Enter the valid email",
      }));
    }

    if (message !== "" && email !== "") {
      setInfo((prevError) => ({
        ...prevError,
        alert: "Message successfully send",
      }));
    } else {
      setInfo((prevError) => ({
        ...prevError,
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
              label="Your Name (Optional)"
              placeholder="Firstname Lastname"
              onChange={handleNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={info.email}
              color="primary"
              required
              label="Email"
              placeholder="Enter your email here"
              onChange={handleEmailChange}
              fullWidth
              helperText={info.email}
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
          error={info.message}
          color="primary"
          required
          label="Message"
          placeholder="Please enter your comments here"
          sx={{ my: 3 }}
          fullWidth
          multiline
          rows={4}
          onChange={handleMessageChange}
          helperText={info.message}
        />
        {info.message !== "" ? (
          <Alert severity={`info`}>{info.alert}</Alert>
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
