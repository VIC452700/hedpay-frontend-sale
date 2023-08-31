import React from "react";

import { useHdpSaleContract } from "@hedpay/hooks/useHdpSaleContract";

import { DiscountListView } from "../views/DiscountListView";

export const DiscountContainer = () => {
  const { stage } = useHdpSaleContract();
  return <DiscountListView phase={stage + 1} />;
};
