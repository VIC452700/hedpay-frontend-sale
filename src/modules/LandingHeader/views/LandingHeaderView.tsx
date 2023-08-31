import React from "react";

import SectionWrapper from "@hedpay/components/SectionWrapper/SectionWrapperComponent";
import { SaleRanges } from "@hedpay/constants/saleRanges";
import { SaleProcessContainer } from "@hedpay/modules/SaleProcess/containers/SaleProcessContainer";

import LimitedOffer from "../components/LimitedOffer/LimitedOfferComponent";
import PhaseWrapper from "../components/PhaseWrapper/PhaseWrapperComponent";

import styles from "./styles.module.scss";

const LandingHeaderView = () => {
  return (
    <SectionWrapper className={styles.landingHeaderRoot}>
      <div className={styles.landingHeaderContent} id="landingView">
        <SaleProcessContainer />
        <div>
          <div className={styles.growingLayerByLayer}>
            <PhaseWrapper>
              <div>
                <span>1</span>
              </div>
              <div>
                <span>3k</span>
                <span>to</span>
                <span>3m HDP</span>
              </div>
              <span>$0.15</span>
              <span>Seed</span>
              <span>{SaleRanges[0].duration}</span>
            </PhaseWrapper>
            <PhaseWrapper>
              <div>
                <span>2</span>
              </div>
              <div>
                <span>70k</span>
                <span>to</span>
                <span>7m HDP</span>
              </div>
              <span>$0.25</span>
              <span>Private Sale</span>
              <span>{SaleRanges[1].duration}</span>
            </PhaseWrapper>
            <PhaseWrapper className={styles.activePhase}>
              <div>
                <span>3</span>
              </div>
              <div>
                <span>100k</span>
                <span>to</span>
                <span>10m HDP</span>
              </div>
              <span>$0.35</span>
              <span>Public Sale</span>
              <span>{SaleRanges[2].duration}</span>
            </PhaseWrapper>
          </div>
          <LimitedOffer />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingHeaderView;
