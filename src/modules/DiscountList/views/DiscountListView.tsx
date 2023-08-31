import React from "react";

import { Discounts } from "@hedpay/constants/discounts";

import DiscountNotification from "../components/DiscountNotification/DiscountNotificationComponent";

import styles from "./styles.module.scss";

export const DiscountListView = ({ phase }: { phase: number }) => (
  <div className={styles.discountListViewRoot}>
    {Discounts.map((discount, index) => (
      <DiscountNotification
        discountPercentageFrom={discount.discountPercentageFrom}
        discountPercentageTo={discount.discountPercentageTo}
        maxAmount={discount.maxAmount}
        minAmount={discount.minAmount}
        phaseNumber={phase}
        key={discount.discountPercentageFrom}
        disabled={index > 5}
      />
    ))}
  </div>
);
