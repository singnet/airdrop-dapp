import { Meta } from "@storybook/react";
import EcosystemComponent from "./";

export default {
  title: "Components/Ecosystem",
} as Meta;

export const Ecosystem: React.VFC<{}> = () => {
  return <EcosystemComponent blogLink="www.google.com" />;
};
