import React, { memo } from "react";
import PropTypes from "prop-types";

import Button from "@hedpay/components/Button/ButtonComponent";

import styles from "./styles.module.scss";

type Props = {
  isConnected: boolean;
  walletAddress?: string;
  onClick: () => void;
};

const ConnectWalletButtonComponent: React.FC<Props> = memo<Props>(
  ({ isConnected, walletAddress, onClick }) => (
    <Button className={styles.connectWalletButtonRoot} onClick={() => onClick()}>
      {isConnected && walletAddress
        ? `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-3)}`
        : "Connect Wallet"}
    </Button>
  )
);

ConnectWalletButtonComponent.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  walletAddress: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

ConnectWalletButtonComponent.displayName = "ConnectWalletButtonComponent";

export default ConnectWalletButtonComponent;
