import { useContext } from "react";

import { Web3Context } from "@hedpay/contexts/Web3";

export const useWalletCommand = () => {
  const { connect, disconnect, account: walletAddress } = useContext(Web3Context);

  return { connect, disconnect, walletAddress };
};
