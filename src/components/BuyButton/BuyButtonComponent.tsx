import React, { memo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import Button from "@hedpay/components/Button/ButtonComponent";
import { useHdpSaleContract } from "@hedpay/hooks/useHdpSaleContract";

import styles from "./styles.module.scss";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const BuyButtonComponent: React.FC<Props> = memo<Props>(({ onClick, disabled }) => {
  const { isConnected, connect } = useHdpSaleContract();
  return (
    <>
      {isConnected ? (
        <Button
          className={clsx(styles.buyButtonRoot, disabled ? styles.disabled : "")}
          onClick={() => onClick()}
        >
          Buy
        </Button>
      ) : (
        <Button className={styles.buyButtonRoot} onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
    </>
  );
});

BuyButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

BuyButtonComponent.displayName = "BuyButtonComponent";

export default BuyButtonComponent;
