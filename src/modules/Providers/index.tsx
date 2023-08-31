import { ReactNode } from "react";

import { ModalProvider } from "@hedpay/contexts/Modal";
import { Web3Provider } from "@hedpay/contexts/Web3";

type ProvidersPropsType = {
  children?: ReactNode;
};

export default function Providers({ children }: ProvidersPropsType) {
  return (
    <Web3Provider>
      <ModalProvider>{children}</ModalProvider>
    </Web3Provider>
  );
}
