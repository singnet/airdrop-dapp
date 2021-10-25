import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type HistoryEvent = {
  label: string;
  value: string;
};

type HistoryProps = {
  events: HistoryEvent[];
};
export default function History({ events }: HistoryProps) {
  return (
    <List>
      {events.map((event) => (
        <ListItem key={event.label} sx={{ my: "2px", py: 0 }}>
          <Grid container sx={{ bgcolor: "bgHighlight.main", borderRadius: "2px", px: 3, py: 2 }}>
            <Grid item xs={6}>
              <Typography>{event.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{event.value}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
