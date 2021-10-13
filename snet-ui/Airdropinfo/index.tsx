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
        Airdrop Information : Lorem ipsum dolor sit amet, consectetur.
      </Typography>
      <Typography color="textAdvanced.dark" variant="normal" sx={{ mt: 3, display: "block", textAlign: "left" }}>
        Lorem Ipsum is simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard
        dummy text eve since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets co
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
