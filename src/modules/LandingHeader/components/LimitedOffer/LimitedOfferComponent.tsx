import React from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

const LimitedOfferComponent = () => (
  <div className={styles.limitedOfferRoot}>
    <div>
      <p className={styles.limitedOfferHeader}>Limited offer</p>
      <p className={styles.warning}>
        Maximum purchase per address is <span>5</span>
        <span>%</span> of the total amount of HDP-B per phase
      </p>
    </div>
    <div className={styles.buttonsWrapper}>
      <div className={styles.whiteBox}>
        <div>
          <span>$ 1</span>to<span>$ 1,000</span>
        </div>
        <p>Discount up to 10%</p>
      </div>
      <div className={clsx(styles.whiteBox, styles.button)}>Buy now</div>
    </div>
  </div>
);

export default LimitedOfferComponent;
