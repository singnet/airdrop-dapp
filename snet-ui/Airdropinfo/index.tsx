import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { AIRDROP_TITLE_STRING, AIRDROP_DESCRIPTION_STRING } from 'utils/airdropWindows';

type Props = {
  blogLink?: string;
};

export default function Airdropinfo({ blogLink }: Props) {
  return (
    <Box>
      <Typography align="left" fontWeight="bold" variant="h1" color="bgtext.main">
        {AIRDROP_TITLE_STRING}
      </Typography>
      <Typography color="textAdvanced.dark" variant="normal" sx={{ mt: 3, display: 'block', textAlign: 'left' }}>
        {AIRDROP_DESCRIPTION_STRING}
      </Typography>
      {blogLink ? (
        <Box mt={6}>
          <Button
            variant="outlined"
            color="secondary"
            href={blogLink}
            target="_blank"
            rel="noreferrer noopener"
            sx={{ textTransform: 'capitalize' }}
          >
            Read Whitepaper
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
