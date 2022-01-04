import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import React, { forwardRef } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
    <Box
      sx={{
        bgcolor: 'bgHighlight.main',
        justifyContent: 'center',
        //px: [1, 4, 15],
        py: '64px',
        height:"856px",
        width:"1440px"
      }}
      ref={ref}
    >
      <Box
      sx={{
      height:"728px",
      width:"1160px",
      py:"64px"


      }}
      >
        <Typography align="center" fontWeight="bold" color="bgtext.main" variant="h3">
          {title}
        </Typography>
        <Box sx={{ height: '632px', width: '1160px' }}>
          <Grid container spacing={4} mt={1} direction="row">
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
                  <Typography
                    fontWeight="bold"
                    color="bgtext.main"
                    variant="priority"
                    component="p"
                    sx={{ mb: '16px' }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="normal" color="textAdvanced.dark">
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
        </Box>
      </Box>
    </Box>
  );
}
export default forwardRef(HowItWorks);
