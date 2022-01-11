import moment from 'moment';
import { checkDateIsGreaterThan, checkDateIsBetween } from './date';

export type AirdropWindowTimeline = {
  airdrop_window_timeline_date: string;
  airdrop_window_timeline_description: string;
  airdrop_window_timeline_title: string;
};

export type AirdropWindow = {
  airdrop_id: number;
  airdrop_window_id: number;
  airdrop_window_order: number;
  airdrop_window_name: string;
  airdrop_window_registration_start_period: string;
  airdrop_window_registration_end_period: string;
  airdrop_window_claim_start_period: string;
  airdrop_window_claim_end_period: string;
  next_window_start_period: string;
  airdrop_window_schedule_description: string;
  airdrop_window_timeline: AirdropWindowTimeline[];
  airdrop_window_total_tokens: number;
  airdrop_window_status?: WindowStatus;
};

export enum WindowStatus {
  UPCOMING = 'UPCOMING',
  REGISTRATION = 'REGISTRATION',
  IDLE = 'IDLE', // Between registration and the claim period
  CLAIM = 'CLAIM',
  LAST_CLAIM = 'LAST_CLAIM',
}

export const AIRDROP_SUPPORT_QUERY_STRING = 'Nunet Airdrop Support Enquiry';
export const TOTAL_AIRDROP_TOKENS_STRING = 'Total Airdrop Tokens';
export const TOTAL_AIRDROPS_STRING = 'Airdrops';
export const SUCCESSFUL_REGISTRATION_STRING = 'Successfully registered for Airdrop window';
export const AIRDROP_ELIGIBILITY_STRING = 'Airdrop Eligibility';
export const AIRDROP_NOT_QUALIFIED_STRING = 'Not Qualified';
export const AIRDROP_INELIGIBILITY_REASON_STRING = 'Sory. You are not qualified for this Airdrop Window';
export const AIRDROP_BLOG_POST = 'https://medium.com/nunet/nunet-ntx-token-airdrop-for-agix-token-holders-c13a89b154b7';
export const AIRDROP_HOW_IT_WORKS_STRING = 'How Nunet Airdrop works';
export const AIRDROP_TITLE_STRING = 'NuNet Airdrop';
export const AIRDROP_DESCRIPTION_STRING = 'NuNet is distributing 5% of its total supply of one billion NTX tokens to SingularityNET AGIX token holders. ' +
'A total of 50 million NTX will be distributed across the four airdrops of 12.5 million tokens each, in January, April, July and October 2022. ' +
'The October 2022 airdrop will reward only those users who have held AGIX  tokens since the start of the airdrops in January 2022.';

export const AIRDROP_RULES = [
  {
    title: 'AGIX Balance',
    description: 'Your AGIX balance across your wallet, staking account and liquidity contribution on SingularityDAO should be atleast 2500 tokens during the snapshot period.',
  },
  {
    title: 'Registation',
    description: 'You must register your eligible wallet address here in this portal during every registration period. Registration does not cost gas fees, claiming the rewards does cost gas fees.',
  },
];

export const HOW_IT_WORKS = [
  /*{
    title: 'About the NuNet Airdrop',
    description:
      'NuNet is distributing 5% of its total supply of one billion NTX tokens to SingularityNET AGIX token holders. ' +
      'A total of 50 million NTX will be distributed across the four airdrops of 12.5 million tokens each, in January, April, July and October 2022. ' +
      'The October 2022 airdrop will reward only those users who have held AGIX  tokens since the start of the airdrops in January 2022.',
  },*/
  {
    title: 'Requirements for participation',
    description:
      'Users will be eligible for the airdrop if they meet two conditions: they must hold a minimum of 2500 ' +
      'AGIX tokens in their wallets at all times during the snapshot periods, and they must register their ' +
      'wallet address here in this portal during every registration period. Registration does not cost gas fees, claiming the rewards does cost gas fees.',
  },
  {
    title: 'Schedule of the snapshots',
    description:
      'To verify that participants meet the requirement of holding 2500 AGIX tokens, continuous snapshots will be ' +
      'taken during the following periods (lowest balance at any point during this period will be considered for the rewards): ' +
      '\n1st: January 5th 11:00 UTC - January 19th 11:00 UTC ' +
      '\n2nd: March 19th 11:00 UTC - April 19th 11:00 UTC ' +
      '\n3rd: June 18th 11:00 UTC - July 18th 11:00 UTC ' +
      '\n4th: January 5th 11:00 UTC - October 16th 11:00 UTC',
  },
  {
    title: 'Schedule of airdrop registration periods',
    description:
      'Participants need to register their wallet address to indicate participation four times, ' +
      'to ensure the NTX tokens get distributed to those who stay involved. Registration can be done on this portal, ' + 
      'during four registration periods: ' +
      '\n1st : January 20th 11:00 UTC - January 25th 11:00 UTC ' +
      '\n2nd: April 20th 11:00 UTC - April 25th 11:00 UTC ' +
      '\n3rd: July 19th 11:00 UTC - July 24th 11:00 UTC ' +
      '\n4th: October 17th 11:00 UTC - October 22nd 11:00 UTC',
  },
  {
    title: 'Claiming schedule',
    description: 'You can claim your NTX tokens on this portal as they become available in the quarterly tranches, ' + 
                 'or you can opt to accumulate them until the end of the fourth airdrop in order to save gas fees. ' + 
                 'You can choose to claim the rewards directly to your wallet or into a 90 day bonded stake pool on SingularityDAO. ' +
                 'You must claim your tokens before November 22th 2022 11:00 UTC; any tokens not claimed by ' +
                 'then will be returned to NuNet and used to fund ongoing development.',
  }
];

export const windowNameActionMap = {
  [WindowStatus.UPCOMING]: 'Registration',
  [WindowStatus.IDLE]: 'Claiming',
  [WindowStatus.REGISTRATION]: 'Claiming',
  [WindowStatus.CLAIM]: 'Claiming',
  [WindowStatus.LAST_CLAIM]: 'Claiming',
};

export const windowStatusActionMap = {
  [WindowStatus.UPCOMING]: 'Starts',
  [WindowStatus.IDLE]: 'Starts',
  [WindowStatus.REGISTRATION]: 'Closes',
  [WindowStatus.CLAIM]: 'Closes',
  [WindowStatus.LAST_CLAIM]: 'closes',
};

export const windowStatusLabelMap = {
  [WindowStatus.UPCOMING]: 'Airdrop Registration Window',
  [WindowStatus.REGISTRATION]: 'Airdrop Registration Window',
  [WindowStatus.IDLE]: 'Airdrop Claim Window',
  [WindowStatus.CLAIM]: 'Airdrop Claim Window',
  [WindowStatus.LAST_CLAIM]: 'Airdrop Claim Window',
};

export const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const findActiveWindow = (
  windows: AirdropWindow[],
): AirdropWindow | undefined => {
  const sortedWindows = windows
    .slice()
    .sort(
      (windowA, windowB) =>
        windowA.airdrop_window_id - windowB.airdrop_window_id,
    );

  const todayDate = moment();
  let activeWindow = sortedWindows.find((windowA) => (
    checkDateIsGreaterThan(windowA.airdrop_window_registration_start_period, todayDate) ||
      checkDateIsGreaterThan(windowA.airdrop_window_registration_end_period, todayDate) ||
      checkDateIsGreaterThan(windowA.airdrop_window_claim_start_period, todayDate)
  ));

  if (activeWindow) {
    const nextWindow = sortedWindows.find((windowA) => (
      checkDateIsGreaterThan(
        windowA.airdrop_window_registration_start_period,
        activeWindow.airdrop_window_claim_start_period,
      )));

    activeWindow.next_window_start_period = activeWindow.airdrop_window_claim_end_period;
    if (nextWindow) {
      activeWindow.next_window_start_period = nextWindow.airdrop_window_registration_start_period;
    }

    if (checkDateIsGreaterThan(activeWindow.airdrop_window_registration_start_period, todayDate)) {
      activeWindow.airdrop_window_status = WindowStatus.UPCOMING;
    } else if (
      checkDateIsBetween(
        activeWindow.airdrop_window_registration_start_period,
        activeWindow.airdrop_window_registration_end_period,
        todayDate,
      )
    ) {
      activeWindow.airdrop_window_status = WindowStatus.REGISTRATION;
    } else if (
      checkDateIsBetween(
        activeWindow.airdrop_window_registration_end_period,
        activeWindow.airdrop_window_claim_start_period,
        todayDate,
      )
    ) {
      activeWindow.airdrop_window_status = WindowStatus.IDLE;
    } else {
      activeWindow.airdrop_window_status = WindowStatus.CLAIM;
    }
  } else {
    // No active window so default to last window and set end time till claim end
    activeWindow = sortedWindows[sortedWindows.length - 1];
    activeWindow.airdrop_window_status = WindowStatus.LAST_CLAIM;
    activeWindow.next_window_start_period = activeWindow.airdrop_window_claim_end_period;
  }

  return activeWindow;
};

export const findFirstUpcomingWindow = (
  windows: AirdropWindow[],
): AirdropWindow | undefined => {
  const now = new Date();
  const sortedWindows = windows;

  const firstUpcomingWindow = sortedWindows.find((window) =>
    checkDateIsGreaterThan(window.airdrop_window_registration_start_period, now));
  if (firstUpcomingWindow) {
    firstUpcomingWindow.airdrop_window_status = WindowStatus.UPCOMING;
  }
  return firstUpcomingWindow;
};
