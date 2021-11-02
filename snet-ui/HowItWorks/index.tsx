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
    <Box sx={{ bgcolor: "bgHighlight.main", px: [1, 4, 15], py: 8 }}>
      <Typography
        align="center"
        fontWeight="bold"
        color="bgtext.main"
        variant="h3"
      >
        {title}
      </Typography>

      <Grid container spacing={4} mt={1} direction="row">
        {steps.map((step, index) => (
          <Grid item container xs={12} md={6} key={step.title}>
            <Grid item xs={2} sm={1} md={2}>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: 1.5,
                  textAlign: "center",
                  maxWidth: 40,
                  height: "53px",
                  m: 2,
                  mt: 0,
                }}
              >
                <Typography variant="caption">Step</Typography>
                <Box sx={{ flexDirection: "column" }}>
                  <Typography fontWeight="bold" variant="h3">
                    {index + 1}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={10} sm={11} md={10}>
              <Typography
                fontWeight="bold"
                color="bgtext.main"
                variant="priority"
                component="p"
              >
                {step.title}
              </Typography>
              <Typography variant="normal" color="textAdvanced.dark">
                {step.description}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={5}>
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
