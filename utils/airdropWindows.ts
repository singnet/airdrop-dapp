import { isDateBetween, isDateGreaterThan } from "./date";

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

// const sortWindows = (windows: AirdropWindow[]): AirdropWindow[] =>
//   windows.sort((windowA, windowB) => {
//     const { airdrop_window_registration_start_period: AregistrationStart } = windowA;
//     const { airdrop_window_registration_end_period: BregistrationEnd } = windowB;
//     return new Date(AregistrationStart).getTime() - new Date(BregistrationEnd).getTime();
//   });

export const findActiveWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const now = new Date();

  const sortedWindows = windows
    .slice()
    .sort((windowA, windowB) => windowA.airdrop_window_id - windowB.airdrop_window_id);

  const activeWindow = sortedWindows.find((windowA) => {
    return (
      isDateGreaterThan(`${windowA.airdrop_window_registration_start_period} UTC`, now) ||
      isDateGreaterThan(`${windowA.airdrop_window_registration_end_period} UTC`, now) ||
      isDateGreaterThan(`${windowA.airdrop_window_claim_start_period} UTC`, now) ||
      isDateGreaterThan(`${windowA.airdrop_window_claim_end_period} UTC`, now)
    );
  });

  if (activeWindow) {
    if (isDateGreaterThan(`${activeWindow.airdrop_window_registration_start_period} UTC`, now)) {
      activeWindow.airdrop_window_status = WindowStatus.UPCOMING;
    } else if (
      isDateBetween(
        `${activeWindow.airdrop_window_registration_start_period} UTC`,
        `${activeWindow.airdrop_window_registration_end_period} UTC`,
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

  const sortedWindows = windows;

  const firstUpcomingWindow = sortedWindows.find((window) =>
    isDateGreaterThan(window.airdrop_window_registration_start_period, now)
  );
  if (firstUpcomingWindow) {
    firstUpcomingWindow.airdrop_window_status = WindowStatus.UPCOMING;
  }
  return firstUpcomingWindow;
};

// export const findNextAirdropWindow = (
//   windows: AirdropWindow[],
//   currentWindowOrder: number
// ): AirdropWindow | undefined => {
//   const nextWindow = windows.find((windowA) => windowA.airdrop_window_order === currentWindowOrder + 1);
//   return nextWindow;
// };
