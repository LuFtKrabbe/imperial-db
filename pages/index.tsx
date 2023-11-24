import Head from "next/head";
import favicon from "../public/imperial.svg";

import DataManager from "../src/components/dataManager/DataManager";
import ErrorBoundary from "../src/components/ErrorBoundary";

import { store } from "../src/app/store";
import { Provider } from "react-redux";

function Page(): JSX.Element {
  return (
    <>
      <Head>
        <title>Imperial DB</title>
        <link rel="icon" type="image/svg+xml" href={favicon.src} />
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <DataManager />
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default Page;
