import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import WalletConnect from "@walletconnect/web3-provider";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web 3 Modal Demo",
      infuraId: process.env.NEXT_PUBLIC_INFURA_KEY
    }
  }
  // walletconnect: {
  //   package: WalletConnect,
  //   options: {
  //     infuraId: process.env.INFURA_KEY
  //   }
  // }
};

const modalTheme = {
  background: "#142850",
  main: "white",
  secondary: "white",
  border: "#254055",
  hover: "#143860"
};

export interface IWeb3Context {
  web3?: Web3;
  connect: Function;
  disconnect: Function;
  account?: string;
  isConnected: boolean;
}

export const Web3Context = createContext<IWeb3Context>({
  web3: undefined,
  connect: () => {},
  disconnect: () => {},
  account: undefined,
  isConnected: false
});

type Web3ProviderPropType = {
  children?: ReactNode;
};

export const Web3Provider = (props: Web3ProviderPropType) => {
  const [web3, setWeb3] = useState<Web3>();
  const [account, setAccount] = useState<string>();
  const [isConnected, toggleConnection] = useState<boolean>(false);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        theme: modalTheme,
        providerOptions
      })
    );
  }, []);

  const reset = useCallback(() => {
    setWeb3(undefined);
    setAccount(undefined);
    toggleConnection(false);
  }, []);

  const subscribeProvider = useCallback(
    (provider: any, web3: Web3) => {
      if (!provider) return;

      provider.on("disconnect", () => {
        reset();
      });

      provider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) reset();
        else setAccount(web3.utils.toChecksumAddress(accounts[0]));
      });

      provider.on("chainChanged", (chainId: number) => {
        console.log("Chain changed: ", chainId);
      });
    },
    [reset]
  );

  const disconnect = useCallback(async () => {
    if (web3 && web3.currentProvider) {
      const _provider: any = web3.currentProvider;
      if (_provider.close) await _provider.close();
    }
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    reset();
  }, [web3Modal, web3, reset]);

  const connect = useCallback(async () => {
    if (!web3Modal) return;

    try {
      const _provider = await web3Modal.connect();

      if (_provider === null) return;

      const _web3 = new Web3(_provider);
      setWeb3(_web3);

      try {
        await _provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: process.env.NEXT_PUBLIC_NETWORD_ID }]
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await _provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: process.env.NEXT_PUBLIC_NETWORD_ID,
                  chainName: "Binance Smart Chain",
                  rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
                  blockExplorerUrls: [process.env.NEXT_PUBLIC_EXPLORER_URL]
                }
              ]
            });
          } catch (addError) {
            throw addError;
          }
        }
      }

      await subscribeProvider(_provider, _web3);

      const _accounts = await _web3.eth.getAccounts();
      const _account = _web3.utils.toChecksumAddress(_accounts[0]);

      setAccount(_account);
      toggleConnection(true);
    } catch (e) {
      await web3Modal.toggleModal();
    }
  }, [web3Modal, subscribeProvider]);

  return (
    <Web3Context.Provider value={{ web3, connect, disconnect, account, isConnected }}>
      {props.children}
    </Web3Context.Provider>
  );
};
