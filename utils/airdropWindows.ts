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

export const TOTAL_AIRDROP_TOKENS_STRING = 'Total Airdrop Tokens';
export const TOTAL_AIRDROPS_STRING = 'Airdrops';
export const SUCCESSFUL_REGISTRATION_STRING = 'Successfully registered for Airdrop window';

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
