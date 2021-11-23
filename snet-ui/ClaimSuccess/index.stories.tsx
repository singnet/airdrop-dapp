import { Meta } from "@storybook/react";
import ClaimSuccessComponent from "./";

export default {
  title: "Components/ClaimSuccess",
} as Meta;

export const ClaimSuccess: React.VFC<{}> = () => {
  return (
    <ClaimSuccessComponent
      onViewSchedule={function (): void {
        throw new Error("Function not implemented.");
      }}
      onViewRules={function (): void {
        throw new Error("Function not implemented.");
      }}
      onViewNotification={function (): void {
        throw new Error("Function not implemented.");
      }}
      currentWindowId={0}
      totalWindows={0}
    />
  );
};
