import { Meta } from "@storybook/react";
import SuccessComponent from "./";

export default {
  title: "Components/Success",
} as Meta;

export const Success: React.VFC<{}> = () => {
  return (
    <SuccessComponent
      onViewSchedule={function (): void {
        throw new Error("Function not implemented.");
      }}
      onViewRules={function (): void {
        throw new Error("Function not implemented.");
      }}
      onViewNotification={function (): void {
        throw new Error("Function not implemented.");
      }}
      windowId={0}
      totalWindows={0}
      claimStartDate={""}
    />
  );
};
