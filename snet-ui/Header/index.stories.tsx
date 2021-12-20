import { Meta } from "@storybook/react";
import HeaderComponent from "./";

export default {
  title: "Components/Header",
} as Meta;

export const Header: React.VFC<{}> = () => {
  return (
    <HeaderComponent onConnectWallet={undefined} onDisconnect={undefined} />
  );
};
