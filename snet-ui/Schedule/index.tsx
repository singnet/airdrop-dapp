import React from 'react';
import Timeline from '@mui/lab/Timeline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ScheduleEvent from './ScheduleEvent';

type Event = {
  time: Date;
  title: string;
  description: string;
};
type Props = {
  title: string;
  events: Event[];
  blogLink?: string;
};

export default function Schedule({ title, events, blogLink }: Props) {
  return (
    <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ bgcolor: 'bgHighlight.main', px: [1, 4, 15], p: 3 }}>
      <Typography align="center" variant="h2" color="primary">
        {title}
      </Typography>
      <Box
        sx={{
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Timeline>
          {events.map((event, index) => (
            <ScheduleEvent key={event.time.toString()} event={event} nextEventTime={events[index + 1]?.time} />
          ))}
        </Timeline>
        <Box textAlign="center">
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
    </Grid>
  );
}
