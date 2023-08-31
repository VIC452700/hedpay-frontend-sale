import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

type Props = {
  children: string;
};

const ContentWrapperComponent: React.FC<Props> = React.memo<Props>(({ children }) => (
  <div className={styles.wrapperRoot}>{children}</div>
));

ContentWrapperComponent.propTypes = {
  children: PropTypes.string.isRequired
};

ContentWrapperComponent.displayName = "ContentWrapperComponent";

export default ContentWrapperComponent;
