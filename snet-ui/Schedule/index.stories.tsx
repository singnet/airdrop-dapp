import { Meta } from "@storybook/react";
import ScheduleComponent from "./";

export default {
  title: "Components/Schedule",
} as Meta;

export const Schedule: React.VFC<{}> = () => {
  return <ScheduleComponent title="Vesting Schedule" events={ScheduleSampleData} blogLink="www.google.com" />;
};

const ScheduleSampleData = [
  {
    time: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    title: "Lorem Ipsum is simply dummy text of the printing an",
    description:
      "typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
  },
  {
    time: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    title: "It is a long established fact that a",
    description:
      " is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions ",
  },
  {
    time: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    title: "Contrary to popular belief, Lorem Ipsum is not si",
    description:
      "andom text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem I",
  },
  {
    time: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    title: "Where can I get some?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generat",
  },
  {
    time: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    title: "atise on the theory of ethics, very popu",
    description:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, c",
  },
];
