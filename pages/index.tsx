import AirdropSchedules from 'components/AirdropSchedule';
import EligibilityBanner from 'components/EligibilityBanner';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import HowItWorks from 'snet-ui/HowItWorks';
import Box from '@mui/material/Box';
import Airdroprules from 'snet-ui/Airdroprules';
import SubscribeToNotification from 'snet-ui/SubscribeToNotification';
import Ecosystem from 'snet-ui/Ecosystem';
import CommonLayout from 'layout/CommonLayout';
import Registration from 'components/Registration';
import Typography from '@mui/material/Typography';
import Learn from 'snet-ui/LearnandConnect';
// import Notqualified from "snet-ui/Noteligible";
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import FAQPage from 'snet-ui/FAQ';
import axios from 'utils/Axios';

import { API_PATHS } from 'utils/constants/ApiPaths';
import { findActiveWindow, WindowStatus } from 'utils/airdropWindows';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import { ClaimStatus, UserEligibility } from 'utils/constants/CustomTypes';
import { useAppDispatch, useAppSelector } from 'utils/store/hooks';
import { Alert } from '@mui/material';
import { APIError } from 'utils/errors';
import { selectActiveWindow, setActiveWindowState } from 'utils/store/features/activeWindowSlice';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
});

const headerOffset = 82;

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const { account } = useActiveWeb3React();
  const rulesRef = useRef<HTMLDivElement>(null);
  const howitworksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const getNotificationRef = useRef<HTMLDivElement>(null);
  const [schedules, setSchedules] = useState<any[] | undefined>(undefined);
  // const [activeWindow, setActiveWindow] = useState<AirdropWindow | undefined>(undefined);
  const [userEligibility, setUserEligibility] = useState<UserEligibility>(UserEligibility.PENDING);
  const [rejectReasons, setRejectReasons] = useState<string | undefined>('');
  const [userRegistered, setUserRegistered] = useState(false);
  const [airdropWindowRules, setWindowRules] = useState([]);
  const [airdropWindowRewards, setAirdropwindowRewards] = useState(0);
  const [userClaimStatus, setUserClaimStatus] = useState<ClaimStatus>(ClaimStatus.NOT_STARTED);
  const [airdropRules, setAirdropRules] = useState([]);

  const [airdropTotalTokens, setAirdropTotalTokens] = useState({
    value: 0,
    name: '',
  });
  const { error: walletError } = useAppSelector((state) => state.wallet);
  const { window: activeWindow } = useAppSelector(selectActiveWindow);
  const dispatch = useAppDispatch();
  // const [currentWindowRewards, setCurrentWindowRewards] = useState(0);

  console.log('airdropTotalTokens', airdropTotalTokens);

  useEffect(() => {
    getAirdropSchedule();
  }, []);

  useEffect(() => {
    getUserEligibility();
  }, [activeWindow, account]);

  const getAirdropSchedule = async () => {
    try {
      const airdropId = process.env.NEXT_PUBLIC_AIRDROP_ID;
      const data: any = await axios.get(`${API_PATHS.AIRDROP_SCHEDULE}/${airdropId}`);
      const airdrop = data.data.data;
      const airdropTimelines = airdrop.airdrop_windows.map((el) => el.airdrop_window_timeline);

      const airdropSchedules = airdropTimelines.flat().map((timeline) => ({
        time: timeline.airdrop_window_timeline_date,
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
      console.log('schedule error', e);
      // TODO: Implement error handling
    }
  };

  const handleScrollToView = (elemRef: RefObject<HTMLDivElement>) => {
    if (!elemRef) return;

    const offsetTop = elemRef.current?.offsetTop;
    if (typeof offsetTop === 'undefined') {
      return;
    }
    const offsetPosition = offsetTop - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };
  const handleScrollToLink = (scrollToKey?: string) => {
    if (scrollToKey === 'schedule') {
      handleScrollToView(scheduleRef);
    } else if (scrollToKey === 'faq') {
      handleScrollToView(faqRef);
    } else if (scrollToKey === 'howitworks') {
      handleScrollToView(howitworksRef);
    } else if (scrollToKey === 'rules') {
      handleScrollToView(rulesRef);
    }
  };

  const getUserEligibility = async () => {
    try {
      if (
        typeof activeWindow?.airdrop_id === 'undefined' ||
        typeof activeWindow?.airdrop_window_id === 'undefined' ||
        !account
      )
        return;
      setUserEligibility(UserEligibility.PENDING);
      const payload: any = {
        signature: '',
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
      const airdropRewards = data.airdrop_window_rewards;
      const rules = data.airdrop_rules;

      setAirdropRules(rules);
      setAirdropwindowRewards(airdropRewards);
      setUserEligibility(isEligible ? UserEligibility.ELIGIBLE : UserEligibility.NOT_ELIGIBLE);
      setUserRegistered(isRegistered);
      setUserClaimStatus(claimStatus ? claimStatus : ClaimStatus.NOT_STARTED);
      setRejectReasons(reasonForRejection);
      // setCurrentWindowRewards(data.airdrop_window_rewards);
    } catch (error: any) {
      console.log('eligibility check error', error);
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

  return (
    <CommonLayout handleScrollToLink={handleScrollToLink}>
      <Head>
        <title>Nunet Occam</title>
      </Head>
      <Box px={[0, 4, 15]} mt={18}>
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
        airdropWindowrewards={airdropWindowRewards}
      />
      <HowItWorks
        ref={howitworksRef}
        title="Claiming your NTX allocation of the OccamRazer launch."
        steps={HowItWorksSampleData}
        blogLink="https://medium.com/occam-finance/nunet-backed-by-singularitynet-to-hold-ido-on-occamrazer-7e9eab947add"
      />
      <SubscribeToNotification ref={getNotificationRef} onSubscribe={handleNotificationSubscription} />

      <AirdropSchedules ref={scheduleRef} schedules={schedules} />
      <Ecosystem blogLink="https://singularitynet.io/" />
    </CommonLayout>
  );
};

export default Home;

const HowItWorksSampleData = [
  {
    title: 'Participate in the OccamRazer IDO',
    description:
      'If you have participated in the OccamRazer round, you can claim the vested allocations here, in two installments of 25%.',
  },
  {
    title: 'OccamRazer vesting schedule',
    description:
      'The two remaining distributions will unlock on December 26th 2021, 13:00 UTC and January 26th 2022, 13:00 UTC.',
  },
  {
    title: 'Process of claiming',
    description:
      'The process is straightforward: after you connect your wallet you can claim the NTX tokens to your wallet.',
  },
  {
    title: 'Final claim',
    description:
      'You can claim your allocations until 3 months after the last unlock. The final claim date is April 26th 13:00 UTC. You can claim both unlocked allocations at once, to save gas fees.',
  },
];
