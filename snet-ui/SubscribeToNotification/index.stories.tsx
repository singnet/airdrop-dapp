import { Meta } from "@storybook/react";
import SubscribeToNotificationComponent from "./";

export default {
  title: "Components/SubscribeToNotification",
} as Meta;

export const SubscribeToNotification: React.VFC<{}> = () => {
  return (
    <SubscribeToNotificationComponent
      onSubscribe={function (email: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
