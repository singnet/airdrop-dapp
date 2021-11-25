import { Meta } from "@storybook/react";
import LearnComponent from "./";

export default {
  title: "Components/Learn",
} as Meta;

export const Learn: React.VFC<{}> = () => {
  return <LearnComponent />;
};
