import { Typography } from '@mui/material';
import React from 'react';
import FlipUnitContainer from './FlipUnitContainer';
import styles from './style.module.css';
import { checkDateIsGreaterThan } from 'utils/date';

function secondsToDhms(sec) {
  sec = Number(sec);
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  return {
    days, hours, minutes, seconds,
  };
}

export type Unit = 'days' | 'hours' | 'minutes' | 'seconds';
export type Animation = 'fold' | 'unfold';
export type Position = 'upperCard' | 'lowerCard';
export type Digit = string | number;

type FlipClockProps = {
  endDate: Date;
};

type FlipClockState = {
  days: number;
  daysShuffle: boolean;
  hours: number;
  hoursShuffle: boolean;
  minutes: number;
  minutesShuffle: boolean;
  seconds: number;
  secondsShuffle: boolean;
};

// class component
export default class FlipCountdown extends React.Component<
  FlipClockProps,
  FlipClockState
> {
  timerID?: NodeJS.Timer | number;

  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      daysShuffle: true,
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID as number);
  }

  updateTime() {
    // get new date
    const now = new Date();
    // set time units
    // const hours = time.getHours();
    // const minutes = time.getMinutes();
    if (checkDateIsGreaterThan(now, this.props.endDate)) {
      // We have nothing to count down to
      return;
    }

    const {
      days, hours, minutes, seconds,
    } = secondsToDhms(
      (this.props.endDate.valueOf() - now.getTime()) / 1000,
    );

    // on day change, update hours and shuffle state
    if (days !== this.state.days) {
      this.setState((prevState) => ({
        days,
        daysShuffle: !prevState.daysShuffle,
      }));
    }
    // on hour change, update hours and shuffle state
    if (hours !== this.state.hours) {
      this.setState((prevState) => ({
        hours,
        hoursShuffle: !prevState.hoursShuffle,
      }));
    }
    // on minute change, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      this.setState((prevState) => ({
        minutes,
        minutesShuffle: !prevState.minutesShuffle,
      }));
    }
    // on second change, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      this.setState((prevState) => ({
        seconds,
        secondsShuffle: !prevState.secondsShuffle,
      }));
    }
  }

  render() {
    // state object destructuring
    const {
      days,
      daysShuffle,
      hours,
      minutes,
      seconds,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
    } = this.state;

    return (
      <div className={styles.flipClock}>
        <FlipUnitContainer
          unit="days"
          digit={days}
          shuffle={daysShuffle}
          countdown
        />
        <Typography
          variant="h1"
          mt={3.5}
          color="bgHighlight.main"
          fontWeight="bold"
          fontFamily="Montserrat"
        >
          :
        </Typography>
        <FlipUnitContainer
          unit="hours"
          digit={hours}
          shuffle={hoursShuffle}

          countdown
        />
        <Typography
          variant="h1"
          mt={3.5}
          color="bgHighlight.main"
          fontWeight="bold"
          fontFamily="Montserrat"
        >
          :
        </Typography>
        <FlipUnitContainer
          unit="minutes"
          digit={minutes}
          shuffle={minutesShuffle}
          countdown

        />
        {/* <FlipUnitContainer unit={"seconds"} digit={seconds}
        shuffle={secondsShuffle} countdown /> */}
      </div>
    );
  }
}
