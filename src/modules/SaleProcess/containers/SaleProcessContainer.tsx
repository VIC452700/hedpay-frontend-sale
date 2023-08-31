import React, { useEffect, useState } from "react";

import { useHdpSaleContract } from "@hedpay/hooks/useHdpSaleContract";

import SaleProcessView from "../views/SaleProcessView";

export const SaleProcessContainer = () => {
  const { totalUsdAmount, getTotalUsdAmount } = useHdpSaleContract();
  const [remainSeconds, setRemainSeconds] = useState<number>(0);

  const div = (a: number, b: number) => {
    return (a - (a % b)) / b;
  };

  useEffect(() => {
    const interval = setInterval(async () => getTotalUsdAmount(), 60000);
    const interval1 = setInterval(
      async () =>
        setRemainSeconds(div(new Date(2023, 7, 1, 0, 0, 0).getTime() - Date.now(), 1000)),
      1000
    );

    return () => {
      clearInterval(interval);
      clearInterval(interval1);
    };
  }, [getTotalUsdAmount]);

  return (
    <SaleProcessView
      cap={totalUsdAmount}
      days={div(remainSeconds, 86400)}
      hours={div(remainSeconds, 3600) % 24}
      minutes={div(remainSeconds, 60) % 60}
      seconds={remainSeconds % 60}
    />
  );
};
