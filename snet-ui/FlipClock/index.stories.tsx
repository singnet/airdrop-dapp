import { Meta } from "@storybook/react";
import FlipClockComponent from "./";

export default {
  title: "Components/FlipClock",
} as Meta;

export const FlipClock: React.VFC<{}> = () => {
  return <FlipClockComponent />;
};
