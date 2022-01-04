import React, { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Schedule from 'snet-ui/Schedule';

type scheduleEvent = { time: Date; title: string; description: string };
type AirdropProps = {
  schedules?: scheduleEvent[];
};

const AirdropSchedules = ({ schedules }: AirdropProps, ref) => {
  if (!schedules) {
    return (
      <Box sx={{ bgcolor: 'bgHighlight.main' }} ref={ref}>
        Loading
      </Box>
    );
  }
  return (
    <Box sx={{ bgcolor: 'bgHighlight.main' }} ref={ref}>
      <Schedule title="Vesting Schedule" events={schedules} blogLink="https://medium.com/occam-finance/nunet-backed-by-singularitynet-to-hold-ido-on-occamrazer-7e9eab947add" />
    </Box>
  );
};

export default forwardRef(AirdropSchedules);
