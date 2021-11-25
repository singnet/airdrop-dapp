import { Meta } from "@storybook/react";
import AirdropRegistrationComponent from "./";

export default {
  title: "Components/AirdropRegistration",
} as Meta;

export const AirdropRegistration: React.VFC<{}> = () => {
  return (
    <AirdropRegistrationComponent
      currentWindowId={0}
      totalWindows={0}
      endDate={undefined}
      onRegister={function (): void {
        throw new Error("Function not implemented.");
      }}
      onViewSchedule={function (): void {
        throw new Error("Function not implemented.");
      }}
      onViewRules={function (): void {
        throw new Error("Function not implemented.");
      }}
      history={[]}
      onClaim={function (): void {
        throw new Error("Function not implemented.");
      }}
      uiAlert={{
        type: "success",
        message: "",
      }}
    />
  );
};
