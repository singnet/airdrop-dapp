import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GradientBox from "../../snet-ui/GradientBox";
import Container from "@mui/material/Container";

type Props = {
  blogLink?: string;
};

export default function Ecosystem({ blogLink }: Props) {
  return (
    <GradientBox $background="bgGradient" sx={{
      //my: 2, py: 8, px: [0, 4, 15]
      width:"1440px",
      height:"428px"
      }}>
        <Box sx={{width:"963px",height:"300px",pt:"64px",pb:"64px",pl:"238px"}}>
      <Typography
        align="center"
        variant="h2"
        color="text.secondary"
        component="p"
        mb={3}
        sx={{pl:"234.04px"}}
      >
        SingularityNET Ecosystem
      </Typography>
      <Container>
        <Typography color="text.secondary" align="left" textAlign="justify" sx={{height:"116px",width:"963px",fontSize:"18px"}}>
          SingularityNET hosts an ecosystem of different technology projects in
          different areas with the common theme of accelerating to the future
          and to the Technological Singularity in a beneficial way under
          decentralized democratic control. Click here to read more about our
          other ecosystem projects, including Rejuve, Mindplex, SingularityDAO,
          and TrueAGI.
        </Typography>
      </Container>
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
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >
                Visit SingularityNet
              </Button>
            ) : null}
            {/* {blogLink ? (
              <Button
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
                variant="outlined"
                color="bgHighlight"
                endIcon={<OpenInNewIcon />}
                href={blogLink}
                target="_blank"
                rel="noreferrer noopener"
              >
                View All Airdrops
              </Button>
            ) : null} */}
          </Stack>
        </Box>
      </Box>
      </Box>
    </GradientBox>
  );
}
