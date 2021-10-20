import React, { forwardRef, useEffect, useState } from "react";
import axios from "utils/Axios";
import Schedule from "snet-ui/Schedule";
import Box from "@mui/material/Box";
import { API_PATHS } from "utils/ApiPaths";

const AirdropSchedules = ({}, ref) => {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    getAirdropSchedule();
  }, []);

  const getAirdropSchedule = async () => {
    try {
      const tokenName = "AGIX";
      const data: any = await axios.get(`${API_PATHS.AIRDROP_SCHEDULE}/${tokenName}`);

      const airdropTimelines = data.data.data.airdrop_windows.map((el) => el.airdrop_window_timeline);

      const airdropSchedules = airdropTimelines.flat().map((timeline) => ({
        time: new Date(timeline.airdrop_window_timeline_date),
        title: timeline.airdrop_window_timeline_info,
        description: timeline.airdrop_window_timeline_description,
      }));

      setSchedules(airdropSchedules);
    } catch (e) {
      console.log("schedule error", e);
      // TODO: Implement error handling
    }
  };

  // const events = schedules.map((schedule) => ({
  //   time: new Date(schedule.airdrop_window_timeline_date),
  //   title: schedule.airdrop_window_timeline_info,
  //   description: schedule.airdrop_window_timeline_description,
  // }));

  return (
    <Box sx={{ bgcolor: "bgHighlight.main" }} ref={ref}>
      <Schedule title="Airdrop Schedule" events={schedules} blogLink="www.google.com" />
    </Box>
  );
};

export default forwardRef(AirdropSchedules);
