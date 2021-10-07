import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";

type Step = {
  title: string;
  description: string;
};
type Props = {
  title: string;
  steps: Step[];
};

export default function HowItWorks({ title, steps }: Props) {
  return (
    <Box sx={{ bgcolor: "bgHighlight.main", p: 3 }}>
      <Typography align="center">{title}</Typography>

      <Grid container spacing={4} mt={1}>
        {steps.map((step, index) => (
          <Grid item container xs={12} md={6} key={step.title} spacing={3}>
            <Grid item xs={2}>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: 1.5,
                  textAlign: "center",
                  p: 0,
                }}
              >
                <Typography>step</Typography>
                <Typography fontWeight="bold">{index + 1}</Typography>
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Typography>{step.title}</Typography>
              <Typography>{step.description}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
