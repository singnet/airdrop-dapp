import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import React from 'react';

export default function SkeletonLoader() {
  return (
    <Box sx={{ bgcolor: 'bgHighlight.main', my: 4, p: 4, py: 2, borderRadius: 2 }} color="textAdvanced.dark">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    </Box>
  );
}
