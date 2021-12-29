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
import moment from "moment";

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

export default function ScheduleEvent({
  event,
  nextEventTime,
}: ScheduleEventProps) {
  const isActiveEvent =
    nextEventTime && isDateBetween(event?.time, nextEventTime, now);
  const nextEvent = () => nextEventTime;
  const formattedDate = moment
    .utc(event.time)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  return (
    <TimelineItem sx={{ bgcolor: "textAdvanced.main" }} key={event.id}>
      <TimelineOppositeContent sx={{ display: "none" }} />
      <TimelineSeparator>
        <TimelineDot
          sx={{ width: 19, height: 19, borderColor: "common.white" }}
          color="primary"
        />
        {!!nextEventTime ? (
          <TimelineConnector>
            {isActiveEvent ? (
              <Typography
                sx={{
                  position: "absolute",
                  bgcolor: "bgHighlight.main",
                  color: "textAdvanced.dark",
                  mt: 3,
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
            <Typography variant="h6" fontSize="18px" color="primary">
              {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              fontSize="18px"
              color="primary"
              component="p"
            >
              {event.title}
            </Typography>
            <Typography
              variant="normal"
              fontSize="14px"
              color="textAdvanced.primary"
            >
              {event.description}
            </Typography>
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}
