import React, { memo, useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

type Props = {
  phaseNumber: number;
  discountPercentageFrom: number;
  discountPercentageTo: number;
  minAmount: number;
  maxAmount: number;
  disabled?: boolean;
};

const DiscountNotificationComponent: React.FC<Props> = memo<Props>(
  ({
    phaseNumber,
    discountPercentageFrom,
    discountPercentageTo,
    minAmount,
    maxAmount,
    disabled
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    function isElementInViewport() {
      if (!ref.current) return;

      var rect = ref.current.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }

    const handleScroll = useCallback(() => {
      if (isElementInViewport()) {
        ref.current?.classList.add(styles.visible);
        ref.current?.classList.remove(styles.invisible);
        window.removeEventListener("scroll", handleScroll);
      }
    }, [ref]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
      <div
        className={clsx(
          styles.discountNotificationRoot,
          styles.invisible,
          disabled ? styles.disabled : ""
        )}
        ref={ref}
      >
        <div>
          <div className={styles.phase}>
            <span>{phaseNumber}</span>
          </div>
          <span>${minAmount.toLocaleString()}</span>
          <span className={styles.textTo}>to</span>
          <span>${maxAmount.toLocaleString()}</span>
        </div>
        <div className={styles.discountPercentage}>
          <span className={styles.discountLabel}>Discount</span>{" "}
          <span>{`${discountPercentageFrom}-${discountPercentageTo}%`}</span>
        </div>
      </div>
    );
  }
);

DiscountNotificationComponent.propTypes = {
  phaseNumber: PropTypes.number.isRequired,
  discountPercentageFrom: PropTypes.number.isRequired,
  discountPercentageTo: PropTypes.number.isRequired,
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  disabled: PropTypes.bool
};

DiscountNotificationComponent.displayName = "DiscountNotificationComponent";

export default DiscountNotificationComponent;
