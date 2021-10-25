import React from "react";
import GradientBox from "snet-ui/GradientBox";

import Box from "@mui/system/Box";

import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader() {
  return (
    <GradientBox sx={{ p: 3 }}>
      <Skeleton sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Skeleton variant="rectangular" width={120} height={118} sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
        <Skeleton variant="rectangular" width={120} height={118} sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
        <Skeleton variant="rectangular" width={120} height={118} sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
      </Box>
      <Skeleton sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
      <Skeleton sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
      <Skeleton sx={{ bgcolor: "bgHighlight.main", my: 1 }} />
    </GradientBox>
  );
}
