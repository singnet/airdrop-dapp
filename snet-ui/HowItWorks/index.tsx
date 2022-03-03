import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import React, { forwardRef } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Container } from '@mui/material';

type Step = {
  title: string;
  description: string;
};
type Props = {
  title: string;
  steps: Step[];
  blogLink?: string;
};

function HowItWorks({ title, steps, blogLink }: Props, ref) {
  return (
    <Grid sx={{ bgcolor: 'bgHighlight.main', px: [1, 4, 8], py: 8 }} ref={ref}>
      <Container>
        <Typography align="center" fontWeight="bold" color="bgtext.main" variant="h3">
          {title}
        </Typography>
        <Grid container spacing={2} mt={1} direction="row">
          {steps.map((step, index) => (
            <Grid item container xs={12} md={6} key={step.title}>
              <Grid item xs={3} sm={2} md={2} mr={0}>
                <Box
                  sx={{
                    bgcolor: 'info.light',
                    color: 'primary.contrastText',
                    borderRadius: 1.5,
                    textAlign: 'center',
                    maxWidth: 40,
                    height: '53px',
                    m: 2,
                    mt: 0,
                  }}
                >
                  <Typography variant="caption">Step</Typography>
                  <Box sx={{ flexDirection: 'column' }}>
                    <Typography fontWeight="bold" variant="h3">
                      {index + 1}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={9} sm={10} md={10}>
                <Typography fontWeight="bold" color="bgtext.main" variant="priority" component="p" sx={{ mb: '16px' }}>
                  {step.title}
                </Typography>
                <Typography variant="normal" color="textAdvanced.dark" style={{ whiteSpace: 'pre-line' }}>
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
              sx={{ textTransform: 'capitalize', fontWeight: 600 }}
            >
              Read Blog Post
            </Button>
          ) : null}
        </Box>
      </Container>
    </Grid>
  );
}
export default forwardRef(HowItWorks);
