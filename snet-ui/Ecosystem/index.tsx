import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Props = {
  blogLink?: string;
};

export default function Ecosystem({ blogLink }: Props) {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #061753 0%, #184FA7 100%)",
      }}
    >
      <Typography
        align="center"
        fontWeight="bold"
        variant="h6"
        color="text.secondary"
      >
        SingularityNet Ecosystem
      </Typography>

      <Typography color="text.secondary">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets co
      </Typography>

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
  );
}
