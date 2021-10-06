import Airdrop from "components/Airdrop/Airdrop";
import AirdropSchedules from "components/AirdropSchedule/AirdropSchedules";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import nextI18NextConfig from "next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Header from "snet-ui/Header/Header";

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
