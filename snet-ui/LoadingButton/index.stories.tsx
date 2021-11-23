import { Meta } from "@storybook/react";
import LoadingButtonComponent from "./";

export default {
  title: "Components/LoadingButton",
} as Meta;

export const LoadingButton: React.VFC<{}> = () => {
  return <LoadingButtonComponent />;
};
