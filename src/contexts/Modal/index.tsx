import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import CheckIcon from "@hedpay/assets/icons/check.png";
import CloseIcon from "@hedpay/assets/icons/close.png";
import SpinnerIcon from "@hedpay/assets/icons/spinner.gif";
import { useHdpSaleContract } from "@hedpay/hooks/useHdpSaleContract";

import styles from "./styles.module.scss";

export interface IModalContext {
  isOpened: boolean;
  open: Function;
  stage: number;
  setStage: (_: number) => void;
}

export const ModalContext = createContext<IModalContext>({
  isOpened: false,
  open: (_: string, __: number) => {
    return;
  },
  stage: 0,
  setStage: (_: number) => {
    return;
  }
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpened, toggleOpen] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [toAddress, setToAddress] = useState<string>("");
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const { approve, buy, getStableAllowance } = useHdpSaleContract();
  const [isApproving, toggleApproving] = useState<boolean>(false);
  const [isConfirming, toggleConfirming] = useState<boolean>(false);
  const [stableAllowance, setStableAllowance] = useState<number>(0);

  const onOpen = useCallback((_toAddress: string, _usdAmount: number) => {
    toggleOpen(true);
    setToAddress(_toAddress);
    setUsdAmount(_usdAmount);
  }, []);

  const fetchStableAllowance = useCallback(async () => {
    const _stableAllowance = await getStableAllowance();
    setStableAllowance(_stableAllowance);
  }, [getStableAllowance]);

  useEffect(() => {
    if (!stableAllowance || !usdAmount) return;
    if (stableAllowance >= usdAmount) {
      setStage(1);
    }
  }, [stableAllowance, usdAmount]);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
      fetchStableAllowance();
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpened, fetchStableAllowance]);

  const onClose = useCallback(() => {
    toggleOpen(false);
    setToAddress("");
    setUsdAmount(0);
    setStage(0);
    toggleApproving(false);
    toggleConfirming(false);
  }, []);

  const onApprove = useCallback(async () => {
    toggleApproving(true);
    await approve(usdAmount)
      .then(() => {
        toggleApproving(false);
        fetchStableAllowance();
      })
      .catch(() => {
        toggleApproving(false);
      });
  }, [usdAmount, approve, fetchStableAllowance]);

  const onConfirm = useCallback(async () => {
    toggleConfirming(true);
    await buy(toAddress, usdAmount)
      .then(() => {
        toggleConfirming(false);
        setStage(2);
      })
      .catch(() => {
        toggleConfirming(false);
      });
  }, [toAddress, usdAmount, buy]);

  return (
    <ModalContext.Provider value={{ isOpened, open: onOpen, stage, setStage }}>
      <div className={clsx(styles.modalRoot, isOpened ? styles.show : styles.hidden)}>
        <div>
          <div className={styles.modal}>
            <Image
              src={CloseIcon}
              alt="close"
              className={styles.close}
              onClick={onClose}
            />
            <h2>BUY</h2>
            {stage !== 2 ? (
              <>
                <Image src={SpinnerIcon} alt="spinner" className={styles.spin} />
                <div className={styles.detail}>
                  <p>
                    <span>To:</span>&nbsp;&nbsp;{toAddress?.slice(0, 16)}&nbsp;...&nbsp;
                    {toAddress?.slice(-15)}
                  </p>
                  <p>
                    <span>USDT:</span>&nbsp;${usdAmount}
                  </p>
                </div>
                <div className={styles.buttonsWrapper}>
                  <div
                    className={clsx(
                      stage === 0 ? styles.show : styles.hidden,
                      isApproving ? styles.disabled : ""
                    )}
                    onClick={onApprove}
                  >
                    Approve
                  </div>
                  <div
                    className={isConfirming || stage !== 1 ? styles.disabled : ""}
                    onClick={onConfirm}
                  >
                    Confirm
                  </div>
                </div>
              </>
            ) : (
              <>
                <Image src={CheckIcon} alt="spinner" className={styles.spin} />
                <div>
                  <p className={styles.confirmed}>Confirmed</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {children}
    </ModalContext.Provider>
  );
};
