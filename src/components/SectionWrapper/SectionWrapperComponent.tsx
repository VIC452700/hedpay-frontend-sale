import React, { forwardRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SectionWrapperComponent = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => (
    <div className={clsx(styles.sectionWrapperRoot, className)} ref={ref}>
      <div>{children}</div>
    </div>
  )
);
SectionWrapperComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  className: PropTypes.string
};

SectionWrapperComponent.displayName = "SectionWrapperComponent";

export default SectionWrapperComponent;
