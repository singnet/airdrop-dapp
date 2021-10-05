import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Box from "@mui/material/Box";

interface AirdropScheduleProps {
  title: string;
  description: string;
  date: Date;
}

const AirdropSchedule = ({
  date,
  description,
  title,
}: AirdropScheduleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
      }}
    >
      <Timeline position="right">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{date.toString()}</TimelineContent>
        </TimelineItem>
      </Timeline>
      <div>
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>
    </Box>
  );
};

export default AirdropSchedule;
