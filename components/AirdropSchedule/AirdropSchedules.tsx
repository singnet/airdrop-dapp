import React, { useState, useEffect } from "react";
import AirdropSchedule from "snet-ui/AirdropSchedule/AirdropSchedule";
import AirdropScheduleTitle from "./AirdropScheduleTitle";
import axios from "utils/Axios";

const AirdropSchedules = () => {
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

  return (
    <>
      <AirdropScheduleTitle />
      {schedules.map((schedule, index) => {
        return (
          <AirdropSchedule
            key={index} // TODO: Remove index as Key, it is a bad approach
            date={schedule.airdrop_schedule_date}
            title={schedule.airdrop_schedule_info}
            description={schedule.airdrop_schedule_description}
          />
        );
      })}
    </>
  );
};

export default AirdropSchedules;
