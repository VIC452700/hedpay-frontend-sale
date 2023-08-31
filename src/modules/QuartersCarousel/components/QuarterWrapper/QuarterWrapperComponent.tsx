import React, { memo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import MedalIcon from "@hedpay/assets/icons/medal.png";
import ReleasedMarkIcon from "@hedpay/assets/icons/released.png";

import styles from "./styles.module.scss";

type Props = {
  releaseNumber: number;
  year: number;
  monthNumber: number;
  released?: boolean;
};

const numberToOrderText = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth"
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const QuarterWrapperComponent: React.FC<Props> = memo<Props>(
  ({ monthNumber, year, releaseNumber, released }) => (
    <div className={styles.quaterWrapperRoot}>
      <div className={styles.quaterWrapperHeader}>
        <p>{`${numberToOrderText[releaseNumber]} Release`}</p>
        <p>
          {months[monthNumber - 1]} 1&nbsp;
          <span>{year}</span>
        </p>
      </div>
      <div className={styles.quaterWrapperBody}>
        <p>
          on {months[monthNumber - 1].slice(0, 3)} 1, {year}
        </p>
        <p>Tokens will be unlocked to your wallet on scheduled dates</p>
      </div>
      {released && (
        <>
          <Image src={ReleasedMarkIcon} alt="released" />
          <Image src={MedalIcon} alt="medal" />
        </>
      )}
    </div>
  )
);

QuarterWrapperComponent.propTypes = {
  releaseNumber: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  monthNumber: PropTypes.number.isRequired,
  released: PropTypes.bool
};
QuarterWrapperComponent.displayName = "QuarterWrapperComponent";

export default QuarterWrapperComponent;
