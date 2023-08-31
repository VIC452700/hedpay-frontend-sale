"use client"; // This is a client component
import React, { useEffect, useRef } from "react";
import Image from "next/image";

import PDFIcon from "@hedpay/assets/icons/pdf.svg";

import CapBar from "../components/CapBar/CapBarComponent";
import Timer from "../components/Timer/TimerComponent";

import styles from "./styles.module.scss";

type Props = {
  cap: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const SaleProcessView = ({ cap, days, hours, minutes, seconds }: Props) => {
  const circleRef1 = useRef<HTMLDivElement>(null);
  const circleRef2 = useRef<HTMLDivElement>(null);
  const circleRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const landingView = document.getElementById("landingView");
    if (!landingView) return;
    landingView.onmousemove = (ev: MouseEvent) => {
      if (!circleRef1 || !circleRef1.current) return;
      if (!circleRef2 || !circleRef2.current) return;
      if (!circleRef3 || !circleRef3.current) return;

      const x = ev.clientX / window.innerWidth;
      const y = ev.clientY / window.innerHeight;

      circleRef1.current.style.transform = `translate(calc(40% + ${
        x * 70
      }px), calc(10% + ${y * 50}px))`;
      circleRef2.current.style.transform = `translate(calc(10% - ${x * 70}px), -${
        y * 50
      }px)`;
      circleRef3.current.style.transform = `translate(calc(50% - ${
        x * 20
      }px), calc(10% - ${(x + y) * 80}px))`;
    };
  }, []);

  const toWhitepaper = () => {
    window.open("https://hedpay.com/document/whitepaper_3.pdf", "_blank");
  };

  const toContract = () => {
    window.open(
      `https://bscscan.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
      "_blank"
    );
  };

  return (
    <div className={styles.saleProcessRoot}>
      <h1>Public Sale</h1>
      <Timer days={days} hours={hours} minutes={minutes} seconds={seconds} />
      <div className={styles.downloadButtonGroup}>
        <div className={styles.downloadButton} onClick={toWhitepaper}>
          WhitePaper
          <Image src={PDFIcon} alt="whitepaper" />
        </div>
        <div className={styles.downloadButton} onClick={toContract}>
          Contract
          <svg
            fill="#494DD4"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#494DD4">
              <path d="m11 3c-.5523 0-1 .44772-1 1s.4477 1 1 1h2.5858l-6.29291 6.2929c-.39052.3905-.39052 1.0237 0 1.4142.39053.3905 1.02369.3905 1.41422 0l6.29289-6.29289v2.58579c0 .55228.4477 1 1 1s1-.44772 1-1v-5c0-.55228-.4477-1-1-1z" />
              <path d="m5 5c-1.10457 0-2 .89543-2 2v8c0 1.1046.89543 2 2 2h8c1.1046 0 2-.8954 2-2v-3c0-.5523-.4477-1-1-1s-1 .4477-1 1v3h-8v-8h3c.55228 0 1-.44772 1-1s-.44772-1-1-1z" />
            </g>
          </svg>
        </div>
      </div>
      <CapBar cap={cap} />
      <div className={styles.decoration}>
        <div className={styles.circle1} ref={circleRef1}></div>
        <div className={styles.circle2} ref={circleRef2}></div>
        <div className={styles.circle3} ref={circleRef3}></div>
      </div>
    </div>
  );
};

export default SaleProcessView;
