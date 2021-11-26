import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GradientBox from "../../snet-ui/GradientBox";

type Props = {
  blogLink?: string;
};

export default function Ecosystem({ blogLink }: Props) {
  return (
    <GradientBox $background="bgGradient" sx={{ my: 2, py: 8, px: [0, 4, 15] }}>
      <Typography
        align="center"
        variant="h2"
        color="text.secondary"
        component="p"
        mb={3}
      >
        SingularityNET Ecosystem
      </Typography>
      <Box sx={{ mt: 3, mb: 6, mx: 14 }}>
        <Typography color="text.secondary" align="left" textAlign="justify">
          SingularityNET hosts an ecosystem of different technology projects in
          different areas with the common theme of accelerating to the future
          and to the Technological Singularity in a beneficial way under
          decentralized democratic control. Click here to read more about our
          other ecosystem projects, including Rejuve, Mindplex, SingularityDAO,
          and TrueAGI.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Box textAlign="center">
          <Stack spacing={2} direction="row">
            {blogLink ? (
              <Button
                variant="contained"
                color="secondary"
                endIcon={<OpenInNewIcon />}
                href={blogLink}
                target="_blank"
                rel="noreferrer noopener"
              >
                Visit SingularityNet
              </Button>
            ) : null}
            {blogLink ? (
              <Button
                variant="outlined"
                color="bgHighlight"
                endIcon={<OpenInNewIcon />}
                href={blogLink}
                target="_blank"
                rel="noreferrer noopener"
              >
                View All Airdrops
              </Button>
            ) : null}
          </Stack>
        </Box>
      </Box>
    </GradientBox>
  );
}
