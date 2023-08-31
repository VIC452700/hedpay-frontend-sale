import React from "react";

import styles from "./styles.module.scss";

type Props = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const toTwoDigits = (value: number) => {
  return ("0" + value.toString()).slice(-2);
};

const TimerComponent = ({ days, hours, minutes, seconds }: Props) => (
  <div className={styles.timerRoot}>
    <span>{toTwoDigits(days)}</span>
    <span>Days</span>:&nbsp;<span>{toTwoDigits(hours)}</span>
    <span>Hours</span>:&nbsp;<span>{toTwoDigits(minutes)}</span>
    <span>Minutes</span>:&nbsp;<span>{toTwoDigits(seconds)}</span>
    <span>Seconds</span>
  </div>
);

export default TimerComponent;
