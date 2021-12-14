import { Box, styled } from "@mui/system";
import styles from "./style.module.css";
import React from "react";
import { Typography } from "@mui/material";

type StatusBadgeProps = {
  label: string;
};

const BadgeWrapper = styled(Box)`
  position: absolute; /* Important for placing it in right loction with respect to the content */
  width: 170px;
  left: -30px; /* Twice border we are applying for .triangle */
  top: 28px;
`;

const TopRow = styled(Box)(
  ({ theme }) => `
  padding: 7px 16px;
  background: ${theme.palette.success.main};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  color: ${theme.palette.common.white};
`
);

const BottomRow = styled(Box)`
  height: 50px; /* Twice border we are applying for .triangle */
  overflow: hidden;
`;

// // .bottomRow {
//   height: 30px; /* Twice border we are applying for .triangle */
//   overflow: hidden;
// }

const Triangle = styled(Box)(
  ({ theme }) => `
  /* All Values Should Be Equal; */
  border-top: solid 19px ${theme.palette.success.main};
  border-left: solid 15px transparent;
  border-right: solid 15px ${theme.palette.success.main};
  border-bottom: solid 15px transparent;
  width: 0;
`
);

export default function StatusBadge({ label }: StatusBadgeProps) {
  if (!label) return null;
  return (
    <BadgeWrapper>
      <TopRow>
        <Typography variant="body2" sx={{m:3,mt:0.3,mb:0.3}}>{label}</Typography>
      </TopRow>
      <BottomRow>
        <Triangle></Triangle>
      </BottomRow>
    </BadgeWrapper>
  );
}
