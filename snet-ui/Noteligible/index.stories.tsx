import { Meta } from "@storybook/react";
import NotqualifiedComponent from "./";

export default {
  title: "Components/Notqualified",
} as Meta;

export const Notqualified: React.VFC<{}> = () => {
  return (
    <NotqualifiedComponent
      account={""}
      network={""}
      onViewRules={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
