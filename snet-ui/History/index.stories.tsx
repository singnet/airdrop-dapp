import { Meta } from "@storybook/react";
import HistoryComponent from "./";

export default {
  title: "Components/History",
} as Meta;

export const History: React.VFC<{}> = () => {
  return <HistoryComponent events={[]} />;
};
