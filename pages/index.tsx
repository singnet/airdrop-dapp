import AirdropSchedules from 'components/AirdropSchedule';
import EligibilityBanner from 'components/EligibilityBanner';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import HowItWorks from 'snet-ui/HowItWorks';
import Box from '@mui/material/Box';
import SubscribeToNotification from 'snet-ui/SubscribeToNotification';
import Ecosystem from 'snet-ui/Ecosystem';
import CommonLayout from 'layout/CommonLayout';
import Registration from 'components/Registration';
import Airdroprules from 'snet-ui/Airdroprules';

import { RefObject, useEffect, useRef, useState } from 'react';
import axios from 'utils/Axios';

import { API_PATHS } from 'utils/constants/ApiPaths';
import {
  findActiveWindow,
  AIRDROP_LINKS,
  AIRDROP_HOW_IT_WORKS_STRING,
  HOW_IT_WORKS,
  AIRDROP_TITLE_STRING,
  AIRDROP_RULES,
  WindowStatus,
} from 'utils/airdropWindows';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import { ClaimStatus, UserEligibility } from 'utils/constants/CustomTypes';
import { useAppDispatch, useAppSelector } from 'utils/store/hooks';
import { APIError } from 'utils/errors';
import { selectActiveWindow, setActiveWindowState } from 'utils/store/features/activeWindowSlice';
import { Grid } from '@mui/material';

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
  const [airdropWindowRewards, setAirdropwindowRewards] = useState(0);
  const [userClaimStatus, setUserClaimStatus] = useState<ClaimStatus>(ClaimStatus.NOT_STARTED);
  const [registrationId, setRegistrationId] = useState('');
  const [airdropTotalTokens, setAirdropTotalTokens] = useState({
    value: 0,
    name: '',
  });
  const { error: walletError } = useAppSelector((state) => state.wallet);
  const { window: activeWindow } = useAppSelector(selectActiveWindow);
  const dispatch = useAppDispatch();

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

      const activeAirdropWindow = findActiveWindow(airdrop.airdrop_windows);

      dispatch(
        setActiveWindowState({
          totalWindows: airdrop.airdrop_windows.length,
          window: activeAirdropWindow,
        })
      );

      setSchedules(airdropSchedules);

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
      ) {
        return;
      }
      setUserEligibility(UserEligibility.PENDING);
      const payload: any = {
        signature: '',
        address: account,
        airdrop_id: activeWindow.airdrop_id,
        airdrop_window_id: activeWindow.airdrop_window_id,
      };
      const response = await axios.post(API_PATHS.AIRDROP_USER_ELIGIBILITY, payload);

      const data = response.data.data;
      let isEligible = data.is_eligible;
      const claimStatus = data.airdrop_window_claim_status;
      const isRegistered = data.is_already_registered;
      const reasonForRejection = data.reject_reason;
      const airdropRewards = data.airdrop_window_rewards;
      localStorage.setItem("registration_id", data.registration_id);
      if (
        (activeWindow?.airdrop_window_status === WindowStatus.CLAIM ||
          activeWindow?.airdrop_window_status === WindowStatus.IDLE)
        &&
        ((!isRegistered && airdropRewards == 0))

      ) {
        // HACK: Implement better logic
        // If the user is not registered but has some
        // past rewards to be claimed, allow them to do so
        isEligible = false;
      } else if ((activeWindow?.airdrop_window_status === WindowStatus.CLAIM ||
        activeWindow?.airdrop_window_status === WindowStatus.IDLE) && airdropRewards > 0) {
        isEligible = true;
      }

      setAirdropwindowRewards(airdropRewards);
      setUserEligibility(isEligible ? UserEligibility.ELIGIBLE : UserEligibility.NOT_ELIGIBLE);
      setUserRegistered(isRegistered);
      setUserClaimStatus(claimStatus || ClaimStatus.NOT_STARTED);
      setRejectReasons(reasonForRejection);
      // setCurrentWindowRewards(data.airdrop_window_rewards);
    } catch (error: any) {
      console.log('eligibility check error', error);
    }
  };

  const handleNotificationSubscription = async (email: string) => {
    try {
      const AirdropId = process.env.NEXT_PUBLIC_AIRDROP_ID;
      await axios.post(API_PATHS.SUBSCRIBE_NOTIFACTION, { email, airdrop_id: AirdropId });
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
        <title>{AIRDROP_TITLE_STRING}</title>
      </Head>
      <Grid>
        <Box px={[0, 4, 15]} mt={18}>
          <EligibilityBanner
            userEligibility={userEligibility}
            onViewRules={() => handleScrollToView(rulesRef)}
            onViewSchedule={() => handleScrollToView(scheduleRef)}
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
      </Grid>
      <HowItWorks
        ref={howitworksRef}
        title={AIRDROP_HOW_IT_WORKS_STRING}
        steps={HOW_IT_WORKS}
        blogLink={AIRDROP_LINKS.BLOG_POST}
      />
      <SubscribeToNotification ref={getNotificationRef} onSubscribe={handleNotificationSubscription} />
      <Airdroprules title="Airdrop Rules" steps={AIRDROP_RULES} blogLink={AIRDROP_LINKS.BLOG_POST} ref={rulesRef} />
      <AirdropSchedules ref={scheduleRef} schedules={schedules} />
      <Ecosystem blogLink="https://singularitynet.io/" />
    </CommonLayout>
  );
};

export default Home;
