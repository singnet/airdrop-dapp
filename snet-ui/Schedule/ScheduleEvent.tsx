import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { checkDateIsBetween, getDateInStandardFormat } from 'utils/date';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { Container } from '@mui/material';

type Event = {
  time: Date;
  title: string;
  description: string;
};

type ScheduleEventProps = {
  event: Event;
  nextEventTime?: Date;
};

const now = moment.utc(new Date());

export default function ScheduleEvent({ event, nextEventTime }: ScheduleEventProps) {
  const isActiveEvent = nextEventTime && checkDateIsBetween(moment.utc(event?.time), moment.utc(nextEventTime), now);
  const nextEvent = () => nextEventTime;
  const formattedDate = getDateInStandardFormat(event.time);
  return (
    <Container>
      <TimelineItem sx={{ bgcolor: 'textAdvanced.main' }} key={event.id}>
        <TimelineOppositeContent sx={{ display: 'none' }} />
        <TimelineSeparator>
          <TimelineDot sx={{ width: 19, height: 19, borderColor: 'common.white' }} color="primary" />
          {nextEventTime ? (
            <TimelineConnector sx={{ height: 100 }}>
              {isActiveEvent ? (
                <Typography
                  sx={{
                    position: 'absolute',
                    bgcolor: 'bgHighlight.main',
                    color: 'textAdvanced.dark',
                    mt: 7,
                  }}
                  variant="body2"
                >
                  Upcoming
                  <span></span>
                </Typography>
              ) : null}
            </TimelineConnector>
          ) : null}
        </TimelineSeparator>
        <TimelineContent>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              {isActiveEvent ? (
                <Typography variant="h6" fontSize="18px" color="green" pb="10px">
                  {formattedDate}
                </Typography>
              ) : (
                <Typography variant="h6" fontSize="18px" color="primary">
                  {formattedDate}
                </Typography>
              )}
            </Grid>
            <Grid item xs={8}>
              {isActiveEvent ? (
                <Typography variant="h6" fontSize="18px" color="green">
                  {event.title}
                </Typography>
              ) : (
                <Typography variant="h6" fontSize="18px" color="primary" component="p">
                  {event.title}
                </Typography>
              )}
              <Typography variant="normal" fontSize="14px" color="textAdvanced.primary">
                {event.description}
              </Typography>
            </Grid>
          </Grid>
        </TimelineContent>
      </TimelineItem>
    </Container>
  );
}
