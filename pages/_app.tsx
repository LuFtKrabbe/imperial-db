import "../styles/global.css";

import type { AppProps } from "next/app";
import { wrapper } from "../src/app/store";
import SearchString from "../src/components/searchString/SearchString";
import Pagination from "../src/components/pagination/Pagination";
import ErrorBoundary from "../src/components/ErrorBoundary";

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString />
        <Pagination />
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default wrapper.withRedux(App);
