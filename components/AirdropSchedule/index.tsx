import React, { forwardRef, useEffect, useState } from "react";
import axios from "utils/Axios";
import Schedule from "snet-ui/Schedule";
import Box from "@mui/material/Box";

const AirdropSchedules = ({}, ref) => {
  const [schedules, setSchedule] = useState([]);

  useEffect(() => {
    getAirdropSchedule();
  }, []);

  const getAirdropSchedule = async () => {
    try {
      const payload = {
        limit: "200",
        skip: "0",
      };

      const { data } = await axios.post("/airdrop-schedule", payload);
      setSchedule(data.data.schedule);
    } catch (e) {
      // TODO: Implement error handling
    }
  };

  const events = schedules.map((schedule) => ({
    time: new Date(schedule.airdrop_schedule_date),
    title: schedule.airdrop_schedule_info,
    description: schedule.airdrop_schedule_description,
  }));

  return (
    <Box sx={{ bgcolor: "bgHighlight.main" }} ref={ref}>
      <Schedule
        title="Airdrop Schedule"
        events={events}
        blogLink="www.google.com"
      />
    </Box>
  );
};

export default forwardRef(AirdropSchedules);
