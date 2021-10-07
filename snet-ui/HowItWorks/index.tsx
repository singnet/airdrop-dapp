import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Step = {
  title: string;
  description: string;
};
type Props = {
  title: string;
  steps: Step[];
  blogLink?: string;
};

export default function HowItWorks({ title, steps, blogLink }: Props) {
  return (
    <Box sx={{ bgcolor: "bgHighlight.main", p: 3 }}>
      <Typography align="center" fontWeight="bold">
        {title}
      </Typography>

      <Grid container spacing={4} mt={1}>
        {steps.map((step, index) => (
          <Grid item container xs={12} md={6} key={step.title} spacing={2}>
            <Grid item xs={2} sm={1} md={2}>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: 1.5,
                  textAlign: "center",
                  p: 0,
                  maxWidth: 35,
                }}
              >
                <Typography>step</Typography>
                <Typography fontWeight="bold">{index + 1}</Typography>
              </Box>
            </Grid>
            <Grid item xs={10} sm={11} md={10}>
              <Typography fontWeight="bold">{step.title}</Typography>
              <Typography>{step.description}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center">
        {blogLink ? (
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<OpenInNewIcon />}
            href={blogLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            Read Blog Post
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
