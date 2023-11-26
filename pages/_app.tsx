import "../styles/global.css";

import type { AppProps } from "next/app";
import { wrapper } from "../src/app/store";

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
