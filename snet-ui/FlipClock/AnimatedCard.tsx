import React from "react";
import { Digit, Animation } from "./";
import styles from "./style.module.css";

type AnimatedCardProps = {
  animation: Animation;
  digit: Digit;
};

export default function AnimatedCard({ animation, digit }: AnimatedCardProps) {
  const animationClass = animation === "fold" ? styles.fold : styles.unfold;
  return (
    <div className={`${styles.flipCard} ${animationClass}`}>
      <span>{digit}</span>
    </div>
  );
}
