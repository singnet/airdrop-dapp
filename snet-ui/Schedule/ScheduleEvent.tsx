import React, { useMemo } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { isDateBetween } from "utils/date";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Event = {
  time: Date;
  title: string;
  description: string;
};

type ScheduleEventProps = {
  event: Event;
  nextEventTime?: Date;
};

const now = new Date();

const DateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  // timeZone: "UTC",
  timeZoneName: "short",
});

export default function ScheduleEvent({ event, nextEventTime }: ScheduleEventProps) {
  const isActiveEvent = nextEventTime && isDateBetween(event?.time, nextEventTime, now);
  const formattedDate = useMemo(() => DateFormatter.format(event.time), [event]);
  console.log("isActiveEvent", event.time.toDateString());
  return (
    <TimelineItem sx={{ bgcolor: "textAdvanced.main" }} key={event.time.toDateString()}>
      <TimelineOppositeContent sx={{ display: "none" }} />
      <TimelineSeparator>
        <TimelineDot color={isActiveEvent ? "success" : undefined} />
        {!!nextEventTime ? (
          <TimelineConnector>
            {isActiveEvent ? (
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  bgcolor: "bgHighlight.main",
                }}
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
            <Typography variant="priority" color={isActiveEvent ? "secondary" : "primary"} component="p">
              {formattedDate.split(",")[0]}
            </Typography>
            <Typography variant="priority" color={isActiveEvent ? "secondary" : "primary"}  component="p">
              {formattedDate.split(",")[1]}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="priority" color={isActiveEvent ? "secondary" : "primary"} component="p">
              {event.title}
            </Typography>
            <Typography variant="normal" color="textAdvanced.primary">
              {event.description}
            </Typography>
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}
