import { Meta } from "@storybook/react";
import TextFieldComponent from "./";

export default {
  title: "Components/TextField",
} as Meta;

export const TextField: React.VFC<{}> = () => {
  return <TextFieldComponent variant={"filled"} />;
};
