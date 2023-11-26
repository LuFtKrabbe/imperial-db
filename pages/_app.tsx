import "../styles/global.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { wrapper } from "../src/app/store";
import favicon from "../public/imperial.svg";
import ErrorBoundary from "../src/components/ErrorBoundary";

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <Head>
          <title>Imperial DB</title>
          <link rel="icon" type="image/svg+xml" href={favicon.src} />
        </Head>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default wrapper.withRedux(App);
