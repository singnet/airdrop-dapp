import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Divider from "@mui/material/Divider";
import { isDateBetween } from "utils/date";
import ScheduleEvent from "./ScheduleEvent";

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
    <Box sx={{ bgcolor: "bgHighlight.main", px: [1, 4, 15], p: 3 }}>
      <Typography align="center" variant="h2" color="primary">
        {title}
      </Typography>
      <Box
        sx={{
          justifyContent: "center",
          m: 10.,
          mt: 2,
        }}
      >
        <Timeline>
          {events.map((event, index) => (
            <ScheduleEvent
              key={event.time.toString()}
              event={event}
              nextEventTime={events[index + 1]?.time}
            />
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
              sx={{textTransform:"capitalize"}}
            >
              Read Blog Post
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
