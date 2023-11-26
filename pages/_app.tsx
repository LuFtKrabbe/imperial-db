import "../styles/global.css";

import type { AppProps } from "next/app";
import { wrapper } from "../src/app/store";
import SearchString from "../src/components/searchString/SearchString";
import Pagination from "../src/components/pagination/Pagination";

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <h1>IMPERIAL PLANETARY DATABASE</h1>
      <SearchString />
      <Pagination />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
