import { isDateBetween, isDateGreaterThan } from "./date";

export type AirdropWindowTimeline = {
  airdrop_window_timeline_date: string;
  airdrop_window_timeline_description: string;
  airdrop_window_timeline_title: string;
};

export type AirdropWindow = {
  airdrop_id: number;
  airdrop_window_id: number;
  airdrop_window_name: string;
  airdrop_window_registration_start_period: string;
  airdrop_window_registration_end_period: string;
  airdrop_window_claim_start_period: string;
  airdrop_window_claim_end_period: string;
  airdrop_window_schedule_description: string;
  airdrop_window_timeline: AirdropWindowTimeline[];
  airdrop_window_total_tokens: number;
  airdrop_window_status?: WindowStatus;
};

export enum WindowStatus {
  UPCOMING = "UPCOMING",
  REGISTRATION = "REGISTRATION",
  CLAIM = "CLAIM",
}

const sortWindows = (windows: AirdropWindow[]): AirdropWindow[] =>
  windows.sort((windowA, windowB) => {
    const { airdrop_window_registration_start_period: AregistrationStart } = windowA;
    const { airdrop_window_registration_end_period: BregistrationEnd } = windowB;
    return new Date(AregistrationStart).getTime() - new Date(BregistrationEnd).getTime();
  });

export const findActiveWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const now = new Date();
  //   windows.forEach((window) => {
  //     console.log(
  //       isDateBetween(window.airdrop_window_registration_start_period, window.airdrop_window_registration_end_period, now)
  //     );
  //   });
  const activeWindow = windows.find(
    ({
      airdrop_window_registration_start_period: registrationStart,
      airdrop_window_registration_end_period: registrationEnd,
      airdrop_window_claim_start_period: claimStart,
      airdrop_window_claim_end_period: claimEnd,
    }) => isDateBetween(registrationStart, registrationEnd, now) || isDateBetween(claimStart, claimEnd, now)
  );
  if (activeWindow) {
    if (
      isDateBetween(
        activeWindow.airdrop_window_registration_start_period,
        activeWindow.airdrop_window_registration_end_period,
        now
      )
    ) {
      activeWindow.airdrop_window_status = WindowStatus.REGISTRATION;
    } else {
      activeWindow.airdrop_window_status = WindowStatus.CLAIM;
    }
  }

  return activeWindow;
};

export const findFirstUpcomingWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const now = new Date();
  // const sortedWindows = windows.sort((windowA, windowB) => {
  //   const { airdrop_window_registration_start_period: AregistrationStart } = windowA;
  //   const { airdrop_window_registration_end_period: BregistrationEnd } = windowB;
  //   return new Date(AregistrationStart).getTime() - new Date(BregistrationEnd).getTime();
  // });

  const sortedWindows = sortWindows(windows);

  const firstUpcomingWindow = sortedWindows.find((window) =>
    isDateGreaterThan(window.airdrop_window_registration_start_period, now)
  );
  if (firstUpcomingWindow) {
    firstUpcomingWindow.airdrop_window_status = WindowStatus.UPCOMING;
  }
  return firstUpcomingWindow;
};

export const findNextAirdropWindow = (
  windows: AirdropWindow[],
  currentWindow: AirdropWindow | undefined
): AirdropWindow | undefined => {
  if (!currentWindow) return;
  const sortedWindows = sortWindows(windows);
  const nextWindow = sortedWindows.find((window) =>
    isDateGreaterThan(window.airdrop_window_registration_start_period, currentWindow.airdrop_window_claim_end_period)
  );
  return nextWindow;
};
