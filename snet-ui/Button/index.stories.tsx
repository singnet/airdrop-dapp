import { Button } from "@mui/material";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Button",
} as Meta;
export const Primary: React.VFC<{}> = () => <Button color="primary" variant="contained">Button</Button>;
export const Secondary: React.VFC<{}> = () => <Button color="secondary" variant="contained">Secondary</Button>;
