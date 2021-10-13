import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useTheme } from "@mui/styles";
import GradientBox from "snet-ui/GradientBox";
type Props = {
  blogLink?: string;
};

export default function Ecosystem({ blogLink }: Props) {
  const theme = useTheme();
  console.log("theme", theme);
  return (
    <GradientBox $background="bgGradient" sx={{ my: 2 }}>
      <Typography align="center" fontWeight="bold" variant="h6" color="text.secondary">
        SingularityNet Ecosystem
      </Typography>

      <Typography color="text.secondary" align="center">
        Lorem Ipsum is simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard
        dummy text eve since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets co
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Box textAlign="center">
          <Stack spacing={2} direction="row">
            {blogLink ? (
              <Button
                variant="contained"
                color="info"
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
                color="secondary"
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
