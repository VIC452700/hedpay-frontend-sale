"use client"; // This is a client component
import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import Logo from "@hedpay/assets/icons/logo.png";
import LogoLight from "@hedpay/assets/icons/logo-light.png";
import ConnectWalletButton from "@hedpay/components/ConnectWalletButton/ConnectWalletButtonComponent";

import styles from "./styles.module.scss";

type Props = {
  walletAddress?: string;
  isConnected: boolean;
  onClick: () => void;
};

export const MainHeaderView: React.FC<Props> = memo<Props>(
  ({ walletAddress, isConnected, onClick }) => {
    const [isPageTop, togglePageTop] = useState<boolean>(true);

    const handleScroll = useCallback(() => {
      if (window.scrollY > 0) {
        togglePageTop(false);
      } else togglePageTop(true);
    }, []);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
      <div className={styles.mainHeaderRoot}>
        <div className={!isPageTop ? styles.pageNotTop : ""}>
          <div className={styles.mainHeaderLogo}>
            <Image src={Logo} alt="HedPay Logo" />
            <Image src={LogoLight} alt="HedPay Logo" />
          </div>
          <ConnectWalletButton
            onClick={() => onClick()}
            isConnected={isConnected}
            walletAddress={walletAddress}
          />
        </div>
      </div>
    );
  }
);

MainHeaderView.propTypes = {
  walletAddress: PropTypes.string,
  isConnected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

MainHeaderView.displayName = "MainHeaderView";
