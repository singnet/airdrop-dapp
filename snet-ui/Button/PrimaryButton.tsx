import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export default PrimaryButton;
