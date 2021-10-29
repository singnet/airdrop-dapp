import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

type Props = {
  blogLink?: string;
};

export default function Airdropinfo({ blogLink }: Props) {
  return (
    <Box>
      <Typography align="left" fontWeight="bold" variant="h1" color="bgtext.main">
        Airdrop Information: Find out how to participate in the NuNet Airdrop.
      </Typography>
      <Typography color="textAdvanced.dark" variant="normal" sx={{ mt: 3, display: "block", textAlign: "left" }}>
        Like all SingularityNET projects, NuNet has allocated 5% of its token supply for an airdrop to our loyal
        followers and backers. You can find out here if you're eligible, and learn how to participate.
      </Typography>
      {blogLink ? (
        <Box mt={6}>
          <Button variant="outlined" color="secondary" href={blogLink} target="_blank" rel="noreferrer noopener">
            Read Whitepaper
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
