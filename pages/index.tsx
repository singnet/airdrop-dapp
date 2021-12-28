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
import { findActiveWindow, WindowStatus } from "utils/airdropWindows";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import { ClaimStatus, UserEligibility } from "utils/constants/CustomTypes";
import { useAppDispatch, useAppSelector } from "utils/store/hooks";
import { Alert } from "@mui/material";
import { APIError } from "utils/errors";
import {
  selectActiveWindow,
  setActiveWindowState,
} from "utils/store/features/activeWindowSlice";
import moment from "moment";

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
  const howitworksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const getNotificationRef = useRef<HTMLDivElement>(null);
  const [schedules, setSchedules] = useState<any[] | undefined>(undefined);
  // const [activeWindow, setActiveWindow] = useState<AirdropWindow | undefined>(undefined);
  const [userEligibility, setUserEligibility] = useState<UserEligibility>(
    UserEligibility.PENDING
  );
  const [rejectReasons, setRejectReasons] = useState<string | undefined>("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [userClaimStatus, setUserClaimStatus] = useState<ClaimStatus>(
    ClaimStatus.NOT_STARTED
  );
  const [airdropRules, setAirdropRules] = useState([]);

  const [airdropTotalTokens, setAirdropTotalTokens] = useState({
    value: 0,
    name: "",
  });
  const { error: walletError } = useAppSelector((state) => state.wallet);
  const { window: activeWindow } = useAppSelector(selectActiveWindow);
  const dispatch = useAppDispatch();
  // const [currentWindowRewards, setCurrentWindowRewards] = useState(0);

  console.log("airdropTotalTokens", airdropTotalTokens);

  useEffect(() => {
    getAirdropSchedule();
  }, []);

  useEffect(() => {
    getUserEligibility();
  }, [activeWindow, account]);

  const getAirdropSchedule = async () => {
    try {
      const airdropId = process.env.NEXT_PUBLIC_AIRDROP_ID;
      const data: any = await axios.get(
        `${API_PATHS.AIRDROP_SCHEDULE}/${airdropId}`
      );
      const airdrop = data.data.data;
      const airdropTimelines = airdrop.airdrop_windows.map(
        (el) => el.airdrop_window_timeline
      );

      const airdropSchedules = airdropTimelines.flat().map((timeline) => ({
        time: new Date(moment.utc(timeline.airdrop_window_timeline_date)),
        title: timeline.airdrop_window_timeline_info,
        description: timeline.airdrop_window_timeline_description,
      }));

      // let activeWindow = findActiveWindow(airdrop.airdrop_windows);
      // if (!activeWindow) {
      //   activeWindow = findFirstUpcomingWindow(airdrop.airdrop_windows);
      // }

      // const nextAirdropWindow = findNextAirdropWindow(airdrop.airdrop_windows, activeWindow);
      // setNextWindow(nextAirdropWindow);

      // setActiveWindow(activeWindow);
      const activeAirdropWindow = findActiveWindow(airdrop.airdrop_windows);

      dispatch(
        setActiveWindowState({
          totalWindows: airdrop.airdrop_windows.length,
          window: activeAirdropWindow,
        })
      );

      setSchedules(airdropSchedules);
      setAirdropRules(airdrop.airdrop_rules);

      setAirdropTotalTokens({
        value: airdrop.airdrop_total_tokens,
        name: airdrop.token_name,
      });
    } catch (e) {
      console.log("schedule error", e);
      // TODO: Implement error handling
    }
  };

  const handleScrollToView = (elemRef: RefObject<HTMLDivElement>) => {
    if (!elemRef) return;
  

    const offsetTop = elemRef.current?.offsetTop;
    if (typeof offsetTop === "undefined") {
      return;
    }
    const offsetPosition = offsetTop - headerOffset;
    

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };
  const handleScrollToLink = (scrollToKey?: string) => {
    if (scrollToKey === "schedule") {
      handleScrollToView(scheduleRef);
    } else if (scrollToKey === "faq") {
      handleScrollToView(faqRef);
    } else if (scrollToKey === "howitworks") {
      handleScrollToView(howitworksRef);
    } else if (scrollToKey === "rules") {
      handleScrollToView(rulesRef);
    }
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
      const response = await axios.post(
        API_PATHS.AIRDROP_USER_ELIGIBILITY,
        payload
      );

      const data = response.data.data;
      const isEligible = data.is_eligible;
      const claimStatus = data.airdrop_window_claim_status;
      const isRegistered = data.is_already_registered;
      const reasonForRejection = data.reject_reason;
      const rules = data.airdrop_rules;

      setUserEligibility(
        isEligible ? UserEligibility.ELIGIBLE : UserEligibility.NOT_ELIGIBLE
      );
      setUserRegistered(isRegistered);
      setUserClaimStatus(claimStatus ? claimStatus : ClaimStatus.NOT_STARTED);
      setRejectReasons(reasonForRejection);
      // setCurrentWindowRewards(data.airdrop_window_rewards);
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
    <CommonLayout handleScrollToLink={handleScrollToLink}>
      <Head>
        <title>Airdrop</title>
      </Head>
      <Box px={[0, 4, 15]} mt={3}>
        <EligibilityBanner
          userEligibility={userEligibility}
          onViewRules={() => handleScrollToView(rulesRef)}
          rejectReasons={rejectReasons}
        />
      </Box>
      <Registration
        userEligibility={userEligibility}
        userRegistered={userRegistered}
        setUserRegistered={setUserRegistered}
        onViewRules={() => handleScrollToView(rulesRef)}
        onViewSchedule={() => handleScrollToView(scheduleRef)}
        onViewNotification={() => handleScrollToView(getNotificationRef)}
        airdropTotalTokens={airdropTotalTokens}
        claimStatus={userClaimStatus}
        setClaimStatus={setUserClaimStatus}
      />

      <HowItWorks
        ref={howitworksRef}
        title="How NuNet Airdrop works"
        steps={HowItWorksSampleData}
        blogLink="https://medium.com/nunet"
      />
      <SubscribeToNotification
        ref={getNotificationRef}
        onSubscribe={handleNotificationSubscription}
      />
      <Airdroprules
        title="Airdrop Rules"
        steps={RulesSampleData}
        blogLink="https://medium.com/nunet"
        ref={rulesRef}
      />

      <AirdropSchedules ref={scheduleRef} schedules={schedules} />
      <Ecosystem blogLink="https://medium.com/nunet" />

      <FAQPage ref={faqRef} />
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
      "The airdrop will take place in four monthly segments, starting from December 21th 2021, 11:00 UTC. Only participants who have registered in advance will be able to participate. The deadline for completing your registration is December 26th 11:00 UTC.",
  },
  {
    title: "Requirements for participating in the airdrop",
    description:
      "Users will be eligible to register for the airdrop if they have held a minimum of  2500  AGIX tokens in their wallets . We will take a snapshot of the blockchain at that time to verify token balances. You must register your wallet address in this portal to be eligible.",
  },
  {
    title: "NTX Allocation for the Airdrops",
    description:
      "A total of 50,000,000 NTX will be distributed across the four airdrops. These will be distributed in four increasing monthly amounts: 17.5% of the tokens (8,750,000) the first month, 22.5% of the tokens (11,250,000) the second month, 27.5% of the tokens (13,750,000) the third month, and 32.5% of the tokens (16,250,000) the fourth and final month.",
  },
  {
    title: "Schedule of airdrop registration and distribution",
    description:
      "The registration period has started and runs until December 26th 11:00 UTC. You must register below before or you will not be able to participate in the airdrop. Following that is the snapshot at December 19th 2021 11:00 UTC, used to verify token balances to check eligibility. If you need to move tokens to your wallet from an exchange, you must do it before then.",
  },
  {
    title: "Claiming schedule",
    description:
      "You can claim your NTX tokens as they become available in the monthly tranches, or you can opt to leave them until the end of the fourth airdrop. You must claim your tokens before Oct 27, 2022 any tokens not claimed by then will be returned to NuNet and used to fund ongoing development.",
  },
];
const RulesSampleData = [
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
];
