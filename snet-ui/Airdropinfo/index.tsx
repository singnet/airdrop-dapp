import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

type Props = {
  blogLink?: string;
};

export default function Airdropinfo({ blogLink }: Props) {
  return (
    <Box
      sx={{
        width: 600,
        height: 400,
        bgcolor: "bgHighlight.main",
        m: 3,
      }}
    >
      <Typography
        align="center"
        fontWeight="bold"
        variant="h3"
        color="bgtext.main"
      >
        Airdrop Information:Lorem ipsum
      </Typography>
      <Typography color="text.primary" align="center" variant="body1">
        Lorem Ipsum is simply dummy text of the printing and type industry.
        Lorem Ipsum has been the industry's standard dummy text eve since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets co
      </Typography>
      <Box sx={{ m: 3 }}>
        {blogLink ? (
          <Button
            variant="outlined"
            color="info"
            href={blogLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            Read Whitepaper
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
