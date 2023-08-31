import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Web3 from "web3";

import erc20ABI from "@hedpay/constants/erc20ABI.json";
import contractABI from "@hedpay/constants/hdpSaleABI.json";
import { Web3Context } from "@hedpay/contexts/Web3";
import { divDecimals, mulDecimals } from "@hedpay/utils";

const publicWallet = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
const hdpContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const useHdpSaleContract = () => {
  const { isConnected, account, web3: web3WithConnet, connect } = useContext(Web3Context);

  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [discountedPercentage, setDiscountedPercentage] = useState<number>(0);
  const [hdpAmountForUsd, setHdpAmountForUsd] = useState<number>(0);
  const [hdpAmountForUsdWithDecimals, setHdpAmountForUsdWithDecimals] =
    useState<string>("0");
  const [hdpPrice, setHdpPrice] = useState<number>(0);
  const [priceDecimals, setPriceDecimals] = useState<number>(0);
  const [maxHdpTradingAmount, setMaxHdpTradingAmount] = useState<string>("0");
  const [stableTokenAddress, setStableTokenAddress] = useState<string>();
  const [totalSoldOutHdpAmount, setTotalSoldOutHdpAmount] = useState<number>(0);
  const [usdUserAmount, setUsdUserAmount] = useState<number>(0);
  const [hdpUserAmount, setHdpUserAmount] = useState<number>(0);
  const [stage, setStage] = useState<number>(0);
  const [totalUsdAmount, setTotalUsdAmount] = useState<number>(0);

  const web3 = useMemo(
    () =>
      new Web3(
        new Web3.providers.HttpProvider(
          "https://powerful-weathered-silence.bsc.discover.quiknode.pro/aed88f8a01430d75019fec99a3fdb646b8471a62/"
        )
      ),
    []
  );

  const contract = useMemo(
    () => new web3.eth.Contract(contractABI as any[], hdpContractAddress || ""),
    [web3]
  );

  const getHdpPrice = useCallback(async () => {
    try {
      await contract.methods["getPrice"](stage)
        .call({
          from: publicWallet
        })
        .then((priceStr: string) => {
          setHdpPrice(divDecimals(priceStr, priceDecimals));
        });
    } catch (e) {
      console.log(e);
      getHdpPrice();
    }
  }, [contract, priceDecimals, stage]);

  const getTotalSoldOutHdpAmount = useCallback(async () => {
    try {
      await contract.methods["g_soldOut"](stage)
        .call({
          from: publicWallet
        })
        .then((hdpSoldOutStr: string) => {
          setTotalSoldOutHdpAmount(divDecimals(hdpSoldOutStr, 18));
        });
    } catch (e) {
      console.log(e);
      getTotalSoldOutHdpAmount();
    }
  }, [contract, stage]);

  const getTotalUsdAmount = useCallback(async () => {
    try {
      await contract.methods["g_totalWorth"](stage)
        .call({
          from: publicWallet
        })
        .then((totalUsdAmountStr: string) => {
          setTotalUsdAmount(divDecimals(totalUsdAmountStr, 18));
        });
    } catch (e) {
      console.log(e);
      getTotalUsdAmount();
    }
  }, [contract, stage]);

  const getUserInfomation = useCallback(
    async (owner: string) => {
      try {
        await contract.methods["g_userInfo"](owner)
          .call({
            from: publicWallet
          })
          .then((ret: any) => {
            setUsdUserAmount(divDecimals(ret.worth, 18));
            setHdpUserAmount(divDecimals(ret.amount, 18));
          });
      } catch (e) {
        console.log(e);
        getUserInfomation(owner);
      }
    },
    [contract]
  );

  const getStage = useCallback(async () => {
    try {
      await contract.methods["getStage"]()
        .call({
          from: publicWallet
        })
        .then((stage: string) => {
          setStage(Number(stage));
        });
    } catch (e) {
      console.log(e);
      getStage();
    }
  }, [contract]);

  const getPriceDecimals = useCallback(async () => {
    try {
      await contract.methods["getPriceDecimal"]()
        .call({
          from: publicWallet
        })
        .then(async (priceDecimalStr: string) => {
          setPriceDecimals(Number(priceDecimalStr));
        });
    } catch (e) {
      console.log(e);
      getPriceDecimals();
    }
  }, [contract]);

  const getStableTokenAddress = useCallback(async () => {
    try {
      await contract.methods["getStableToken"]()
        .call({
          from: publicWallet
        })
        .then((value: string) => {
          setStableTokenAddress(value);
        });
    } catch (e) {
      console.log(e);
      getStableTokenAddress();
    }
  }, [contract]);

  const getMaxHdpTradingAmount = useCallback(async () => {
    try {
      await contract.methods["getMaxBuyAmount"]()
        .call({
          from: publicWallet
        })
        .then((maxBuyAmountStr: string) => {
          setMaxHdpTradingAmount(maxBuyAmountStr);
        });
    } catch (e) {
      console.log(e);
      getMaxHdpTradingAmount();
    }
  }, [contract]);

  const getDiscountedPercentage = useCallback(
    async (stableAmount: number) => {
      try {
        await contract.methods["getDiscountPercentage"](mulDecimals(stableAmount, 18))
          .call({
            from: publicWallet
          })
          .then((discountedPercentageStr: string) => {
            setDiscountedPercentage(divDecimals(discountedPercentageStr, priceDecimals));
          });
      } catch (e) {
        console.log(e);
        getDiscountedPercentage(stableAmount);
      }
    },
    [contract, priceDecimals]
  );

  const getDiscountedPrice = useCallback(
    async (stableAmount: number) => {
      try {
        await contract.methods["getDiscountedPrice"](mulDecimals(stableAmount, 18))
          .call({
            from: publicWallet
          })
          .then((discountedPriceStr: string) => {
            setDiscountedPrice(divDecimals(discountedPriceStr, priceDecimals));
          });
      } catch (e) {
        console.log(e);
        getDiscountedPrice(stableAmount);
      }
    },
    [contract, priceDecimals]
  );

  const getHdpAmountForUsd = useCallback(
    async (stableAmount: number) => {
      try {
        await contract.methods["getHdpAmount"](mulDecimals(stableAmount, 18))
          .call({
            from: publicWallet
          })
          .then((amount: string) => {
            setHdpAmountForUsd(divDecimals(amount, 18));
            setHdpAmountForUsdWithDecimals(amount);
          });
      } catch (e) {
        console.log(e);
        getHdpAmountForUsd(stableAmount);
      }
    },
    [contract]
  );

  const initialize = useCallback(async () => {
    try {
      await getStage();
      await getPriceDecimals();
      await getHdpPrice();
      await getMaxHdpTradingAmount();
      await getTotalUsdAmount();
      await getTotalSoldOutHdpAmount();
      await getStableTokenAddress();
    } catch (e) {
      console.log(e);
    }
  }, [
    getHdpPrice,
    getMaxHdpTradingAmount,
    getPriceDecimals,
    getStableTokenAddress,
    getStage,
    getTotalSoldOutHdpAmount,
    getTotalUsdAmount
  ]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const approve = useCallback(
    async (stableAmount: number) => {
      if (!isConnected || !account || !web3WithConnet || !stableTokenAddress) return;

      const stableContract = new web3WithConnet.eth.Contract(
        erc20ABI as any[],
        stableTokenAddress
      );

      const stableAmountStr = mulDecimals(stableAmount, 18);
      return await stableContract.methods["approve"](
        hdpContractAddress,
        stableAmountStr
      ).send({
        from: account
      });
    },
    [isConnected, web3WithConnet, account, stableTokenAddress]
  );

  const buy = useCallback(
    async (toAddress: string, stableAmount: number) => {
      if (!isConnected || !account || !web3WithConnet || !stableTokenAddress) return;

      const saleContract = new web3WithConnet.eth.Contract(
        contractABI as any[],
        hdpContractAddress || ""
      );

      const stableAmountStr = mulDecimals(stableAmount, 18);
      return await saleContract.methods["buy"](stableAmountStr, toAddress).send({
        from: account,
        gasLimit: 500000
      });
    },
    [isConnected, web3WithConnet, account, stableTokenAddress]
  );

  const getStableAllowance = useCallback(async () => {
    if (!isConnected || !account || !web3WithConnet || !stableTokenAddress) return;

    const stableContract = new web3WithConnet.eth.Contract(
      erc20ABI as any[],
      stableTokenAddress
    );

    return await stableContract.methods["allowance"](account, hdpContractAddress)
      .call({ from: account })
      .then((allowance: string) => {
        return divDecimals(allowance, 18);
      });
  }, [isConnected, web3WithConnet, account, stableTokenAddress]);

  return {
    approve,
    buy,
    hdpAmountForUsd,
    hdpAmountForUsdWithDecimals,
    hdpPrice,
    maxHdpTradingAmount,
    discountedPrice,
    discountedPercentage,
    totalSoldOutHdpAmount,
    usdUserAmount,
    hdpUserAmount,
    totalUsdAmount,
    stage,
    getHdpPrice,
    getTotalSoldOutHdpAmount,
    getTotalUsdAmount,
    getUserInfomation,
    getStage,
    getStableTokenAddress,
    getMaxHdpTradingAmount,
    getDiscountedPercentage,
    getDiscountedPrice,
    getHdpAmountForUsd,
    getStableAllowance,
    isConnected,
    account,
    connect
  };
};
