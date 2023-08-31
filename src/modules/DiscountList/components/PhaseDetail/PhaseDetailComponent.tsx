import React, { useRef } from "react";

import SectionWrapper from "@hedpay/components/SectionWrapper/SectionWrapperComponent";
import { SaleRanges } from "@hedpay/constants/saleRanges";
import { useHdpSaleContract } from "@hedpay/hooks/useHdpSaleContract";

import styles from "./styles.module.scss";

const PhaseDetailComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { hdpPrice, stage } = useHdpSaleContract();

  return (
    <SectionWrapper className={styles.phaseDetailRoot} ref={ref}>
      <div className={styles.phaseNumber}>
        <p>Phase {stage + 1}</p>
        <p>{SaleRanges[stage].duration}</p>
      </div>
      <div>
        <div className={styles.tokenSupply}>
          {SaleRanges[stage].cap.toLocaleString()} Tokens
        </div>
        <div className={styles.description}>
          Tokens release after end of final offer phase
        </div>
      </div>
      <div className={styles.tokenPrice}>
        <p>$ {hdpPrice}</p>
        <p>For token</p>
      </div>
      <p className={styles.phaseDetail}>
        HDP-B offer in 3 Phases, distribution of total tokens will be after final phase
        finish, tokens will be divided in segments during 6 - 12 months in monthly
        installments, for amounts purchased less than {"<"}$1000 will be instant after the
        final phase.
      </p>
    </SectionWrapper>
  );
};

export default PhaseDetailComponent;
