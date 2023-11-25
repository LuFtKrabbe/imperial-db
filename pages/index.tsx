import Head from "next/head";
import favicon from "../public/imperial.svg";

import DataManager from "../src/components/dataManager/DataManager";
import ErrorBoundary from "../src/components/ErrorBoundary";

import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { PlanetParams, PlanetResponse } from "../src/types/types";

function Page({
  planetList,
  itemsQuantity,
}: {
  planetList: PlanetParams[];
  itemsQuantity: number;
}): JSX.Element {
  console.log(planetList);

  return (
    <>
      <Head>
        <title>Imperial DB</title>
        <link rel="icon" type="image/svg+xml" href={favicon.src} />
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <DataManager planetList={planetList} itemsQuantity={itemsQuantity} />
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default Page;

export async function getServerSideProps() {
  const response = await fetch("https://swapi.dev/api/planets/");
  const data: PlanetResponse = await response.json();

  return {
    props: {
      planetList: data.results,
      itemsQuantity: data.count,
    },
  };
}
