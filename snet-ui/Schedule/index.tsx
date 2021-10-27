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
      <Timeline>
        {events.map((event, index) => (
          <TimelineItem key={event.time.toDateString()}>
            <TimelineOppositeContent sx={{ display: "none" }} />
            <TimelineSeparator>
              <TimelineDot color={index === 0 ? "secondary" : undefined} />
              {index !== events.length - 1 ? (
                <TimelineConnector>
                  {index === 0 ? (
                    <Typography sx={{ position: "absolute", bottom: 0, left: 0, bgcolor: "bgHighlight.main" }}>
                      Upcoming<span></span>
                    </Typography>
                  ) : null}
                </TimelineConnector>
              ) : null}
              {/* {index === 0 ? (
                <TimelineContent>
                  <Typography>Upcoming</Typography>{" "}
                </TimelineContent>
              ) : null} */}
            </TimelineSeparator>
            <TimelineContent>
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Typography variant="priority" color={index === 0 ? "secondary" : "primary"}>
                    {event.time.toDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="priority" color={index === 0 ? "secondary" : "primary"} component="p">
                    {event.title}
                  </Typography>
                  <Typography variant="normal" color="textAdvanced.dark">
                    {event.description}
                  </Typography>
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
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
          >
            Read Blog Post
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
