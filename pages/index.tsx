import Airdrop from "components/Airdrop/Airdrop";
import AirdropSchedules from "components/AirdropSchedule/AirdropSchedules";
import EligibilityBanner from "components/EligibilityBanner";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import nextI18NextConfig from "next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Header from "snet-ui/Header/Header";
import { setShowConnectionModal } from "utils/store/features/walletSlice";
import { useAppDispatch } from "utils/store/hooks";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  // const { showConnectionModal } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Airdrop</title>
      </Head>
      <Header onConnectWallet={() => dispatch(setShowConnectionModal(true))} />
      <EligibilityBanner />
      <Airdrop />
      <AirdropSchedules />
    </>
  );
};

export default Home;
