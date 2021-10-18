import React from "react";
import styles from "./style.module.css";
import { Digit, Position } from "./";

type StaticCardProps = {
  position: Position;
  digit: Digit;
};

export default function StaticCard({ position, digit }: StaticCardProps) {
  const positionClass = position === "upperCard" ? styles.upperCard : styles.lowerCard;
  return (
    <div className={positionClass}>
      <span>{digit}</span>
    </div>
  );
}
