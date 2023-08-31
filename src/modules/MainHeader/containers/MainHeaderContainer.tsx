"use client";
import React from "react";

import { useWalletCommand } from "../commands/useWalletCommand";
import { MainHeaderView } from "../views/MainHeaderView";

export const MainHeaderContainer = () => {
  const { walletAddress, connect, disconnect } = useWalletCommand();

  const handleClick = React.useCallback(async () => {
    if (walletAddress === undefined) await connect();
    else disconnect();
  }, [connect, walletAddress, disconnect]);

  return (
    <MainHeaderView
      isConnected={walletAddress !== undefined}
      walletAddress={walletAddress}
      onClick={handleClick}
    />
  );
};
