import React, { forwardRef } from 'react';
import Schedule from 'snet-ui/Schedule';
import Box from '@mui/material/Box';
import { AIRDROP_BLOG_POST } from 'utils/airdropWindows';

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
      <Schedule
        title="Vesting Schedule"
        events={schedules}
        blogLink={AIRDROP_BLOG_POST}
      />
    </Box>
  );
};

export default forwardRef(AirdropSchedules);
