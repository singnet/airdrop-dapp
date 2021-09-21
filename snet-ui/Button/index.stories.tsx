import { Meta } from "@storybook/react";
import { PrimaryButton } from "./";

export default {
  title: "Components/Button",
  component: PrimaryButton,
} as Meta;
export const Primary: React.VFC<{}> = () => <PrimaryButton>Button</PrimaryButton>;
