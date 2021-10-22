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
  airdrop_window_schedule_description: string;
  airdrop_window_timeline: AirdropWindowTimeline[];
  airdrop_window_total_tokens: number;
};

export const findActiveWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const now = new Date();
  console.log("windows", windows);
  //   windows.forEach((window) => {
  //     console.log(
  //       isDateBetween(window.airdrop_window_registration_start_period, window.airdrop_window_registration_end_period, now)
  //     );
  //   });
  const activeWindow = windows.find((window) =>
    isDateBetween(window.airdrop_window_registration_start_period, window.airdrop_window_registration_end_period, now)
  );
  return activeWindow;
};

export const findFirstUpcomingWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const now = new Date();
  const sortedWindows = windows.sort(
    (windowA, windowB) =>
      new Date(windowA.airdrop_window_registration_start_period).getTime() -
      new Date(windowB.airdrop_window_registration_end_period).getTime()
  );

  const firstUpcomingWindow = sortedWindows.find((window) =>
    isDateGreaterThan(window.airdrop_window_registration_start_period, now)
  );
  return firstUpcomingWindow;
};
