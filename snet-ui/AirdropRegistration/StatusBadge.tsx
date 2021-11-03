import { Box, styled } from "@mui/system";
import styles from "./style.module.css";
import React from "react";

type StatusBadgeProps = {
  label: string;
};

const BadgeWrapper = styled(Box)`
  position: absolute; /* Important for placing it in right loction with respect to the content */
  width: 120px;
  left: -30px; /* Twice border we are applying for .triangle */
  top: 10px;
`;

const TopRow = styled(Box)(
  ({ theme }) => `
  padding: 4px 16px;
  background: ${theme.palette.secondary.main};
  line-height: 40px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  color: ${theme.palette.common.white};
`
);

const BottomRow = styled(Box)`
  height: 30px; /* Twice border we are applying for .triangle */
  overflow: hidden;
`;

// // .bottomRow {
//   height: 30px; /* Twice border we are applying for .triangle */
//   overflow: hidden;
// }

const Triangle = styled(Box)(
  ({ theme }) => `
  /* All Values Should Be Equal; */
  border-top: solid 15px ${theme.palette.secondary.main};
  border-left: solid 15px transparent;
  border-right: solid 15px ${theme.palette.secondary.main};
  border-bottom: solid 15px transparent;
  width: 0;
`
);

export default function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <BadgeWrapper>
      <TopRow>{label}</TopRow>
      <BottomRow>
        <Triangle></Triangle>
      </BottomRow>
    </BadgeWrapper>
  );
}
