"use client"; // This is a client component
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";

import { ModalContext } from "@hedpay/contexts/Modal";
import { useHdpSaleContract } from "@hedpay/hooks/useHdpSaleContract";
import {
  compareBigNumbers,
  getSumOfBigNumbers,
  isValidAddress,
  mulDecimals
} from "@hedpay/utils";

import PurchaseView from "../views/PurchaseView";

export const PurchaseContainer: React.FC = memo(() => {
  const {
    hdpPrice,
    discountedPrice,
    discountedPercentage,
    hdpAmountForUsd,
    hdpAmountForUsdWithDecimals,
    maxHdpTradingAmount,
    isConnected,
    hdpUserAmount,
    getUserInfomation,
    getDiscountedPercentage,
    getHdpAmountForUsd,
    getDiscountedPrice
  } = useHdpSaleContract();
  const [toAddress, setToAddress] = useState<string>("");
  const [usdtAmount, setUsdtAmount] = useState<number>(0);
  const { open } = useContext(ModalContext);

  const getDetails = useCallback(async () => {
    await Promise.all([
      getHdpAmountForUsd(usdtAmount),
      getDiscountedPercentage(usdtAmount),
      getDiscountedPrice(usdtAmount)
    ]);
  }, [getHdpAmountForUsd, getDiscountedPercentage, getDiscountedPrice, usdtAmount]);

  const intervalRef = useRef<any>(null);

  useEffect(
    () => {
      if (usdtAmount !== 0) {
        intervalRef.current = setTimeout(async () => {
          await getDetails();
        }, 1000);
      } else {
        clearTimeout(intervalRef.current);
      }

      return () => clearTimeout(intervalRef.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usdtAmount] // Only call effect if debounced usdt amount changes
  );

  const loopGetUserWorth = useCallback(async () => {
    if (!isValidAddress(toAddress)) return;
    getUserInfomation(toAddress);
  }, [toAddress, getUserInfomation]);

  useEffect(() => {
    const timer = setInterval(() => loopGetUserWorth(), 10000);
    return () => clearInterval(timer);
  }, [loopGetUserWorth]);

  const isValidAmount = useCallback(() => {
    return (
      usdtAmount > 0 &&
      compareBigNumbers(hdpAmountForUsdWithDecimals, maxHdpTradingAmount) < 1
    );
  }, [usdtAmount, hdpAmountForUsdWithDecimals, maxHdpTradingAmount]);

  const handlePurchaseClick = useCallback(() => {
    // buy(toAddress, usdtAmount);
    if (isValidAddress(toAddress) && isValidAmount()) open(toAddress, usdtAmount);
  }, [toAddress, usdtAmount, open, isValidAmount]);

  return (
    <PurchaseView
      toAddress={toAddress}
      setToAddress={(address: string) => {
        setToAddress(address);
        getUserInfomation(address);
      }}
      usdtAmount={usdtAmount}
      setUsdtAmount={setUsdtAmount}
      usdValue={hdpPrice}
      discountUsdValue={usdtAmount ? discountedPrice : 0}
      discountPercentage={usdtAmount ? discountedPercentage : 0}
      totalSum={hdpUserAmount}
      hdpAmount={hdpAmountForUsd}
      deliveryDate={new Date("2023-8-1")}
      onPurchaseClick={handlePurchaseClick}
      disabledBuyButton={!isConnected || !isValidAddress(toAddress) || !isValidAmount()}
      warnedUsdtInput={
        compareBigNumbers(
          getSumOfBigNumbers(hdpAmountForUsdWithDecimals, mulDecimals(hdpUserAmount, 18)),
          maxHdpTradingAmount
        ) === 1
      }
      warnedAddressInput={toAddress !== "" && !isValidAddress(toAddress)}
    />
  );
});

PurchaseContainer.displayName = "PurchaseContainer";
