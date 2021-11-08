import { Meta } from "@storybook/react";
import AirdropRegistrationMiniComponent from "./";

export default {
  title: "Components/AirdropRegistrationMini",
} as Meta;

export const AirdropRegistrationMini: React.VFC<{}> = () => {
  return (
    <AirdropRegistrationMiniComponent
      startDate={undefined}
      totalTokens={0}
      tokenName={""}
    />
  );
};
