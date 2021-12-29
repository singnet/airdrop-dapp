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
          OccamRazer allocations of the NuNet TGE Public Round
      </Typography>
      <Typography color="textAdvanced.dark" variant="normal" sx={{ mt: 3, display: "block", textAlign: "left" }}>
          If you have participated in the OccamRazer launch, you can claim your two vested allocations here.
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
