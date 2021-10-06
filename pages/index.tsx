import type { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "next-i18next.config";
import Header from "snet-ui/Header/Header";
import AirdropSchedules from "components/AirdropSchedule/AirdropSchedules";
import Airdrop from "components/Airdrop/Airdrop";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Airdrop</title>
      </Head>
      <Header />
      <Airdrop />
      <AirdropSchedules />
    </>
  );
};

export default Home;
