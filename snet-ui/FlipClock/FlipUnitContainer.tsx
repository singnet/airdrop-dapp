import React from "react";
import { Digit, Unit } from "./";
import AnimatedCard from "./AnimatedCard";
import StaticCard from "./StaticCard";
import styles from "./style.module.css";

type FlipUnitContainerProps = {
  digit: Digit;
  shuffle: boolean;
  unit: Unit;
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }: FlipUnitContainerProps) => {
  // assign digit values
  let currentDigit: Digit = digit;
  let previousDigit: Digit = Number(digit) - 1;

  // to prevent a negative value
  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className={styles.flipUnitContainer}>
      <StaticCard position={"upperCard"} digit={currentDigit} />
      <StaticCard position={"lowerCard"} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

export default FlipUnitContainer;
