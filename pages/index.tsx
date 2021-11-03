import AirdropSchedules from "components/AirdropSchedule";
import EligibilityBanner from "components/EligibilityBanner";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import nextI18NextConfig from "next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import HowItWorks from "snet-ui/HowItWorks";
import Box from "@mui/material/Box";
import Airdroprules from "snet-ui/Airdroprules";
import SubscribeToNotification from "snet-ui/SubscribeToNotification";
import Ecosystem from "snet-ui/Ecosystem";
import CommonLayout from "layout/CommonLayout";
import Registration from "components/Registration";
import Typography from "@mui/material/Typography";
import Learn from "snet-ui/LearnandConnect";
// import Notqualified from "snet-ui/Noteligible";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import FAQPage from "snet-ui/FAQ";
import axios from "utils/Axios";

import { API_PATHS } from "utils/constants/ApiPaths";
import {
  AirdropWindow,
  findActiveWindow,
  findFirstUpcomingWindow,
  findNextAirdropWindow,
  WindowStatus,
} from "utils/airdropWindows";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import { ClaimStatus, UserEligibility } from "utils/constants/CustomTypes";
import { useAppSelector } from "utils/store/hooks";
import { Alert } from "@mui/material";
import { APIError } from "utils/errors";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
  },
});

const headerOffset = 82;

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const { account } = useActiveWeb3React();
  const rulesRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const getNotificationRef = useRef<HTMLDivElement>(null);
  const [schedules, setSchedules] = useState<any[] | undefined>(undefined);
  const [activeWindow, setActiveWindow] = useState<AirdropWindow | undefined>(undefined);
  const [userEligibility, setUserEligibility] = useState<UserEligibility>(UserEligibility.PENDING);
  const [rejectReasons, setRejectReasons] = useState<string | undefined>("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [userClaimStatus, setUserClaimStatus] = useState<ClaimStatus>(ClaimStatus.NOT_STARTED);
  const [airdropRules, setAirdropRules] = useState([]);
  const [totalWindows, setTotalWindows] = useState(0);
  const [nextWindow, setNextWindow] = useState<AirdropWindow | undefined>(undefined);
  const { error: walletError } = useAppSelector((state) => state.wallet);

  useEffect(() => {
    getAirdropSchedule();
  }, []);

  useEffect(() => {
    getUserEligibility();
  }, [activeWindow, account]);

  const getAirdropSchedule = async () => {
    try {
      const airdropTokenAddress = process.env.NEXT_PUBLIC_AIRDROP_TOKEN_ADDRESS;
      const data: any = await axios.get(`${API_PATHS.AIRDROP_SCHEDULE}/${airdropTokenAddress}`);
      const airdrop = data.data.data;
      const airdropTimelines = airdrop.airdrop_windows.map((el) => el.airdrop_window_timeline);

      const airdropSchedules = airdropTimelines.flat().map((timeline) => ({
        time: new Date(timeline.airdrop_window_timeline_date),
        title: timeline.airdrop_window_timeline_info,
        description: timeline.airdrop_window_timeline_description,
      }));

      let activeWindow = findActiveWindow(airdrop.airdrop_windows);
      if (!activeWindow) {
        activeWindow = findFirstUpcomingWindow(airdrop.airdrop_windows);
      }

      const nextAirdropWindow = findNextAirdropWindow(airdrop.airdrop_windows, activeWindow);
      setNextWindow(nextAirdropWindow);

      setActiveWindow(activeWindow);
      setSchedules(airdropSchedules);
      setAirdropRules(airdrop.airdrop_rules);
      setTotalWindows(airdrop.airdrop_windows.length);
    } catch (e) {
      console.log("schedule error", e);
      // TODO: Implement error handling
    }
  };

  const handleScrollToView = (elemRef: RefObject<HTMLDivElement>) => {
    if (!elemRef) return;
    const elemPosition = elemRef.current?.getBoundingClientRect().top as number;
    const offsetPosition = elemPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const getUserEligibility = async () => {
    try {
      if (
        typeof activeWindow?.airdrop_id === "undefined" ||
        typeof activeWindow?.airdrop_window_id === "undefined" ||
        !account
      )
        return;
      setUserEligibility(UserEligibility.PENDING);
      const payload: any = {
        signature: "",
        address: account,
        airdrop_id: activeWindow.airdrop_id,
        airdrop_window_id: activeWindow.airdrop_window_id,
      };
      const response = await axios.post(API_PATHS.AIRDROP_USER_ELIGIBILITY, payload);

      const data = response.data.data;
      const isEligible = data.is_eligible;
      const claimStatus = data.airdrop_window_claim_status;
      const isRegistered = data.is_already_registered;
      const reasonForRejection = data.reject_reason;
      const rules = data.airdrop_rules;
      // TODO: Uncomment the below line
      setUserEligibility(isEligible ? UserEligibility.ELIGIBLE : UserEligibility.NOT_ELIGIBLE);
      setUserRegistered(isRegistered);
      setUserClaimStatus(claimStatus ? claimStatus : ClaimStatus.NOT_STARTED);
      setRejectReasons(reasonForRejection);
    } catch (error: any) {
      console.log("eligibility check error", error);
    }
  };

  const handleNotificationSubscription = async (email: string) => {
    try {
      await axios.post(API_PATHS.SUBSCRIBE_NOTIFACTION, { email });
    } catch (error: any) {
      const backendErrorMessage = error?.errorText?.error?.message;
      if (backendErrorMessage) {
        throw new APIError(backendErrorMessage);
      }
      throw error;
    }
  };

  const airdropWindowClosingTime = useMemo(
    () =>
      activeWindow?.airdrop_window_status === WindowStatus.CLAIM
        ? activeWindow.airdrop_window_claim_end_period
        : activeWindow?.airdrop_window_status === WindowStatus.REGISTRATION
        ? activeWindow.airdrop_window_registration_end_period
        : activeWindow?.airdrop_window_status === WindowStatus.UPCOMING
        ? activeWindow.airdrop_window_registration_start_period
        : "",
    [activeWindow]
  );

  console.log("activeWindow", activeWindow, airdropWindowClosingTime);

  return (
    <CommonLayout>
      <Head>
        <title>Airdrop</title>
      </Head>
      {account ? (
        <>
          <Box px={[0, 4, 15]} mt={3}>
            <EligibilityBanner
              currentWindowId={activeWindow?.airdrop_window_id ?? 0}
              totalWindows={totalWindows}
              userEligibility={userEligibility}
              onViewRules={() => handleScrollToView(rulesRef)}
              rejectReasons={rejectReasons}
            />
          </Box>
          <Registration
            currentWindowId={activeWindow?.airdrop_window_id ?? 0}
            totalWindows={totalWindows}
            userEligibility={userEligibility}
            userRegistered={userRegistered}
            setUserRegistered={setUserRegistered}
            onViewRules={() => handleScrollToView(rulesRef)}
            onViewSchedule={() => handleScrollToView(scheduleRef)}
            onViewNotification={() => handleScrollToView(getNotificationRef)}
            airdropId={activeWindow?.airdrop_id}
            airdropWindowId={activeWindow?.airdrop_window_id}
            airdropWindowStatus={activeWindow?.airdrop_window_status}
            airdropWindowClosingTime={airdropWindowClosingTime}
            airdropWindowTotalTokens={activeWindow?.airdrop_window_total_tokens}
            claimStatus={userClaimStatus}
            setClaimStatus={setUserClaimStatus}
          />
        </>
      ) : (
        <Box
          sx={{
            bgcolor: "bgHighlight.main",
            borderColor: "info.light",
            mx: [0, 4, 15],
            px: [1, 4, 15],
            my: 2,
            py: 4,
          }}
        >
          <Typography variant="h5" textAlign="center" mb={2}>
            Please connect your wallet to proceed
          </Typography>
          {walletError ? <Alert severity="error">{walletError}</Alert> : null}
        </Box>
      )}

      <HowItWorks title="How NuNet Airdrop works" steps={HowItWorksSampleData} blogLink="www.google.com" />
      <SubscribeToNotification ref={getNotificationRef} onSubscribe={handleNotificationSubscription} />
      <Airdroprules title="Airdrop Rules" steps={airdropRules} blogLink="www.google.com" ref={rulesRef} />
      <AirdropSchedules ref={scheduleRef} schedules={schedules} />
      <Ecosystem blogLink="www.google.com" />

      <FAQPage />
      <Learn />
    </CommonLayout>
  );
};

export default Home;

const HowItWorksSampleData = [
  {
    title: "About the NuNet Airdrop",
    description:
      "NuNet is giving away 5% of its total supply of one billion NTX tokens, i.e. 50 million NTX, for free to loyal backers and members of the SingularityNET and NuNet communities. This airdrop comes with certain requirements for particpation, detailed below.",
  },
  {
    title: "Schedule of the NuNet airdrop",
    description:
      "The airdrop will take place in four monthly segments, starting from DATE-TIME-TIMEZONE. Only participants who have registered in advance will be able to participate. The deadline for completing your registration is DATE-TIME-TIMEZONE.",
  },
  {
    title: "Requirements for participating in the airdrop",
    description:
      "Users will be eligible to register for the airdrop if they have held a minimum of xxxx AGIX tokens or xxxx SDAO in their wallets since DATE-TIME-TIMEZONE. We will take a snapshot of the blcokchain at that time to verify token balances. You must register your wallet address in this portal to be eligible.",
  },
  {
    title: "NTX Allocation for the Airdrops",
    description:
      "A total of 50,000,000 NTX will be distributed across the four airdrops. These will be distributed in four increasing monthly amounts: 17.5% of the tokens (8,750,000) the first month, 22.5% of the tokens (11,250,000) the second month, 27.5% of the tokens (13,750,000) the third month, and 32.5% of the tokens (16,250,000) the fourth and final month.",
  },
  {
    title: "Schedule of airdrop registration and distribution",
    description:
      "The registration period has started and runs until DATE-TIME-TIMEZONE. You must register below before then or you will not be able to participate in the airdrop. Following that is the snapshot at DATE-TIME-TIMEZONE, used to verify token balances to check eligibility. If you need to move tokens to your wallet from an exchange, you must do it before then.",
  },
  {
    title: "Claiming schedule",
    description:
      "You can claim your NTX tokens as they become available in the monthly tranches, or you can opt to leave them until the end of the fourth airdrop. You must claim your tokens before DATE-TIME-TIMEZONE; any tokens not claimed by then will be returned to NuNet and used to fund ongoing development.",
  },
];
