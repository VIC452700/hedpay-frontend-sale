import React, { useEffect, useRef } from "react";

import styles from "./styles.module.scss";

const breakpoints = [150000, 300000, 600000, 1200000, 2000000];

const CapBarComponent = ({ cap }: { cap: number }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cap || !barRef || !barRef.current) return;

    switch (true) {
      case cap <= breakpoints[0]:
        barRef.current.style.setProperty(
          "--pseudo-before-width",
          `${(cap * 17) / breakpoints[0]}%`
        );
        break;
      case cap <= breakpoints[1]:
        barRef.current.style.setProperty(
          "--pseudo-before-width",
          `${((cap - breakpoints[0]) * 25) / (breakpoints[1] - breakpoints[0]) + 17}%`
        );
        break;
      case cap <= breakpoints[2]:
        barRef.current.style.setProperty(
          "--pseudo-before-width",
          `${((cap - breakpoints[1]) * 25) / (breakpoints[2] - breakpoints[1]) + 42}%`
        );
        break;
      case cap <= breakpoints[3]:
        barRef.current.style.setProperty(
          "--pseudo-before-width",
          `${((cap - breakpoints[2]) * 25) / (breakpoints[3] - breakpoints[2]) + 67}%`
        );
        break;
      case cap > breakpoints[3]:
        barRef.current.style.setProperty(
          "--pseudo-before-width",
          ` ${((cap - breakpoints[3]) * 8) / breakpoints[4] + 92}%`
        );
        break;
      default:
        break;
    }
  }, [cap, barRef]);

  return (
    <div className={styles.capBarRoot}>
      <div className={styles.capBar} ref={barRef}>
        <div>($ {breakpoints[0].toLocaleString()})</div>
        <div>($ {breakpoints[1].toLocaleString()})</div>
        <div>($ {breakpoints[2].toLocaleString()})</div>
        <div>
          <span>Private Cap</span> ($ {breakpoints[3].toLocaleString()})
        </div>
      </div>
    </div>
  );
};
export default CapBarComponent;
