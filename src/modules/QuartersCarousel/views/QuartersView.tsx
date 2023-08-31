import React from "react";
import Carousel from "react-multi-carousel";

import QuarterWrapper from "../components/QuarterWrapper/QuarterWrapperComponent";

import "react-multi-carousel/lib/styles.css";
import styles from "./styles.module.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 4480, min: 1280 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1280, min: 970 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 970, min: 0 },
    items: 1
  }
};

const QuartersView = () => (
  <div className={styles.quartersViewRoot}>
    <Carousel ssr responsive={responsive}>
      <QuarterWrapper monthNumber={8} year={2023} releaseNumber={0} released />
      <QuarterWrapper monthNumber={9} year={2023} releaseNumber={1} released />
      <QuarterWrapper monthNumber={10} year={2023} releaseNumber={2} released />
    </Carousel>
    <div className={styles.queryAssets}>
      <p>
        * Disclaimer: all crypto assets are highly risky assets to trade, you may lose all
        your investments be cautious DYOR
      </p>
    </div>
  </div>
);

export default QuartersView;
