import { Button, Grid, Typography } from "@mui/material";
import CommonLayout from "layout/CommonLayout";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "snet-ui/TextField";

const categories = ["Airdrop Enquiry"];

export default function contactus() {
  const [category, setCategory] = useState("Airdrop Enquiry");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <CommonLayout>
      <Box p={5}>
        <Typography align="center" color="primary" variant="h3">
          Contact Us
        </Typography>
        <Grid container sx={{ my: 3 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField color="primary" label="Your Name (Optional)" placeholder="Hello World" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField color="primary" required label="Email" placeholder="Hello World" fullWidth />
          </Grid>
        </Grid>
        <TextField
          color="primary"
          label="Wallet Address (Optional)"
          placeholder="Hello World"
          sx={{ my: 3 }}
          fullWidth
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
          color="primary"
          required
          label="Message"
          placeholder="Please enter your comments here"
          sx={{ my: 3 }}
          fullWidth
          multiline
          rows={4}
        />
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="secondary">
            Contact
          </Button>
        </Box>
      </Box>
    </CommonLayout>
  );
}
