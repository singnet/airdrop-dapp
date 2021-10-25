import React from "react";
import GradientBox from "snet-ui/GradientBox";

import Box from "@mui/system/Box";

import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader() {
  return (
    <GradientBox>
      <Skeleton />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Box>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </GradientBox>
  );
}
