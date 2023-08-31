import React from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

const PhaseWrapperComponent = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={clsx(styles.phaseWrapperRoot, className)}>{children}</div>;

export default PhaseWrapperComponent;
