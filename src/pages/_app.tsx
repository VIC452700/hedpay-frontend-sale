import type { AppProps } from "next/app";

import Providers from "@hedpay/modules/Providers";

import "@hedpay/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
