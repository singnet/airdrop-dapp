import Airdrop from "components/Airdrop/Airdrop";
import AirdropSchedules from "components/AirdropSchedule";
import EligibilityBanner from "components/EligibilityBanner";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import nextI18NextConfig from "next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Header from "snet-ui/Header/Header";
import HowItWorks from "snet-ui/HowItWorks";
import { setShowConnectionModal } from "utils/store/features/walletSlice";
import { useAppDispatch } from "utils/store/hooks";
import Box from "@mui/material/Box";
import Rules from "snet-ui/Rules";
import SubscribeToNotification from "snet-ui/SubscribeToNotification";
import Falsemessage from "snet-ui/Flasemessage";
import Ecosystem from "snet-ui/Ecosystem";
import Airdropinfo from "snet-ui/Airdropinfo";
import Grid from "@mui/material/Grid";
import AirdropRegistrationMini from "snet-ui/AirdropRegistrationMini";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
  },
});

const next10Days = new Date();
next10Days.setDate(next10Days.getDate() + 10);

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Airdrop</title>
      </Head>
      <Falsemessage />
      <Header onConnectWallet={() => dispatch(setShowConnectionModal(true))} />
      <Box px={4} mt={3}>
        <EligibilityBanner />
      </Box>
      <Grid container spacing={2} px={4} mt={2} mb={8}>
        <Grid item xs={12} sm={6}>
          <Airdropinfo blogLink="www.google.com" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AirdropRegistrationMini startDate={next10Days} />
        </Grid>
      </Grid>
      <HowItWorks title="How Airdrop Works" steps={HowItWorksSampleData} blogLink="www.google.com" />
      <SubscribeToNotification />
      <Airdrop />
      <Rules title="Airdrop Rules" rules={HowItWorksSampleData} blogLink="www.google.com" />;
      
      <Box sx={{ p: 10 }}>Airdrop Rules</Box>
      <AirdropSchedules />
      <Ecosystem blogLink="www.google.com" />
    </>
  );
};

export default Home;

const HowItWorksSampleData = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing an",
    description:
      "typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
  },
  {
    title: "It is a long established fact that a",
    description:
      " is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions ",
  },
  {
    title: "Contrary to popular belief, Lorem Ipsum is not si",
    description:
      "andom text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem I",
  },
  {
    title: "Where can I get some?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generat",
  },
  {
    title: "atise on the theory of ethics, very popu",
    description:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, c",
  },
  {
    title: "atise Ipsum is simply dummy text of the printing an",
    description:
      "there are many variations in the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
  },
];

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
