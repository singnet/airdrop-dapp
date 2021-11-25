import { Meta } from "@storybook/react";
import FooterComponent from "./";

export default {
  title: "Components/Footer",
} as Meta;

export const Footer: React.VFC<{}> = () => {
  return <FooterComponent />;
};
