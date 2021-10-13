import React from "react";

import FlipUnitContainer from "./FlipUnitContainer";
import styles from "./style.module.css";

export type Unit = "days" | "hours" | "minutes" | "seconds";
export type Animation = "fold" | "unfold";
export type Position = "upperCard" | "lowerCard";
export type Digit = string | number;

type FlipClockState = {
  hours: number;
  hoursShuffle: boolean;
  minutes: number;
  minutesShuffle: boolean;
  seconds: number;
  secondsShuffle: boolean;
};

// class component
export default class FlipClock extends React.Component<{}, FlipClockState> {
  timerID?: NodeJS.Timer | number;
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.timerID as number);
  }

  updateTime() {
    // get new date
    const time = new Date();
    // set time units
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    // on hour change, update hours and shuffle state
    if (hours !== this.state.hours) {
      this.setState((prevState) => ({ hours, hoursShuffle: !prevState.hoursShuffle }));
    }
    // on minute change, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      this.setState((prevState) => ({ minutes, minutesShuffle: !prevState.minutesShuffle }));
    }
    // on second change, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      this.setState((prevState) => ({ seconds, secondsShuffle: !prevState.secondsShuffle }));
    }
  }

  render() {
    // state object destructuring
    const { hours, minutes, seconds, hoursShuffle, minutesShuffle, secondsShuffle } = this.state;

    return (
      <div className={styles.flipClock}>
        <FlipUnitContainer unit={"hours"} digit={hours} shuffle={hoursShuffle} />
        <FlipUnitContainer unit={"minutes"} digit={minutes} shuffle={minutesShuffle} />
        <FlipUnitContainer unit={"seconds"} digit={seconds} shuffle={secondsShuffle} />
      </div>
    );
  }
}
