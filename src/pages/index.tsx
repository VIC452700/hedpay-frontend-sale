import { useEffect, useState } from "react";
import Head from "next/head";
import clsx from "clsx";

import SectionWrapper from "@hedpay/components/SectionWrapper/SectionWrapperComponent";
import PhaseDetail from "@hedpay/modules/DiscountList/components/PhaseDetail/PhaseDetailComponent";
import { DiscountContainer } from "@hedpay/modules/DiscountList/containers/DiscountContainer";
import { LandingHeaderContainer } from "@hedpay/modules/LandingHeader/containers/LandingHeaderContainer";
import { MainHeaderContainer } from "@hedpay/modules/MainHeader/containers/MainHeaderContainer";
import { PurchaseContainer } from "@hedpay/modules/Purchase/containers/PurchaseContainer";
import { QuartersContainer } from "@hedpay/modules/QuartersCarousel/containers/QuartersContainer";

import styles from "./page.module.scss";

export default function DashboardPage() {
  const [isLoading, toggleLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => toggleLoading(false), 3000);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>HedPay Public Sale</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {isLoading ? (
        <>
          <svg height="60px" width="51px" className={styles.splashIcon}>
            <path
              d="M50.5 0 L40 0 L30 12 L0 12 L0 60 L33.5 60 L41 50 L10 50 L10 22 L33 22 Z"
              fill="white"
            />
          </svg>
          <svg
            height="60px"
            width="51px"
            className={clsx(styles.splashIcon, styles.rotatedIcon)}
          >
            <path
              d="M50.5 0 L40 0 L30 12 L0 12 L0 60 L33 60 L41 50 L10 50 L10 22 L33 22 Z"
              fill="#74c9d2"
            />
          </svg>
          <p className={styles.loadingText}>Loading</p>
        </>
      ) : (
        <div>
          <MainHeaderContainer />
          <div className={styles.dashboardRoot}>
            <LandingHeaderContainer />
            <SectionWrapper className={styles.sellBoard}>
              <PhaseDetail />
              <div className={styles.purchasePanel}>
                <PurchaseContainer />
                <DiscountContainer />
              </div>
            </SectionWrapper>
            <QuartersContainer />
          </div>
        </div>
      )}
    </>
  );
}
