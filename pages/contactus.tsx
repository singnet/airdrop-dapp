import { Button, Grid, SliderTrack, Typography } from "@mui/material";
import CommonLayout from "layout/CommonLayout";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "snet-ui/TextField";

const categories = ["Airdrop Enquiry"];

export default function ContactUs() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState({ email: "", message: "" });
  const [category, setCategory] = useState("Airdrop Enquiry");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleEmailChange = () => {
    setEmail(event.target.value);
  };
  const handleNameChange = () => {
    setName(event.target.value);
  };
  const handleMessageChange = () => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    setError({});

    if (message === "") {
      setError((prevError) => ({
        ...prevError,
        message: "Message should not be empty",
      }));
    }

    if (!email) {
      setError((prevError) => ({
        ...prevError,
        email: "Enter the valid email",
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
              placeholder="Crypto User"
              onChange={handleNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.email}
              color="primary"
              required
              label="Email"
              placeholder="cryptouser@email.com"
              onChange={handleEmailChange}
              helperText={error.email}
              fullWidth
            />
          </Grid>
        </Grid>
        <TextField
          color="primary"
          label="Wallet Address (Optional)"
          placeholder="0xCCc466vgg667y78vyybhy78787Fgh678"
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
          error={error.message}
          color="primary"
          required
          label="Message"
          placeholder="Please enter your comments here"
          sx={{ my: 3 }}
          fullWidth
          multiline
          rows={4}
          onChange={handleMessageChange}
          helperText={error.message}
        />
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Contact
          </Button>
        </Box>
      </Box>
    </CommonLayout>
  );
}
