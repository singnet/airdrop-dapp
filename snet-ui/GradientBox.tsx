import { Box } from "@mui/system";
import { styled } from "@mui/system";

// @ts-ignore
const GradientBox = styled(Box)<{ $background?: string }>`
  background: ${({ theme, $background }: any) =>
    $background && theme.palette[$background] ? theme.palette[$background].main : theme.palette.bgGradient.main};
`;
export default GradientBox;
