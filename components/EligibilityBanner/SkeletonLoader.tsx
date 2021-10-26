import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import React, { useMemo } from "react";
import { SupportedChainId } from "snet-ui/Blockchain/connectors";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { UserEligibility } from "utils/constants/CustomTypes";
import Typography from "@mui/material/Typography";

export default function SkeletonLoader() {
  return (
    <Box sx={{ bgcolor: "bgHighlight.main", my: 4, p: 4, py: 2, borderRadius: 2 }} color="textAdvanced.dark">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    </Box>
  );
}
