import { wrapper } from "../src/app/store";
import {
  getPlanetById,
  getPlanetList,
  getRunningQueriesThunk,
} from "../src/services/planetApi";
import CardList from "../src/components/cardList/CardList";
import { setItemsQuantity } from "../src/components/pagination/paginationSlice";
import { PlanetParams, PlanetResponse } from "../src/types/types";
import Pagination from "../src/components/pagination/Pagination";
import DetailedCard from "../src/components/detailedCard/DetailedCard";
import SearchString from "../src/components/searchString/SearchString";

function Page({
  planetResponse,
  planet,
}: {
  planetResponse: PlanetResponse;
  planet: PlanetParams;
}) {
  return (
    <>
      <h1>IMPERIAL PLANETARY DATABASE</h1>
      <SearchString />
      <Pagination />
      <CardList planetList={planetResponse.results} />
      {planet ? <DetailedCard planet={planet} /> : <></>}
    </>
  );
}

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = context.params?.page as string;
    const isCard = page.includes("card");
    const id = isCard ? page.split("=").slice(-1)[0] : "1";

    const response = await store.dispatch(
      getPlanetList.initiate(`?${page.split("&").slice(0, 2).join("&")}`),
    );
    const planetResponse = response.data as PlanetResponse;

    const response2 = await store.dispatch(getPlanetById.initiate(`${id}`));
    const planet = isCard ? (response2.data as PlanetParams) : null;

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    store.dispatch(setItemsQuantity(planetResponse.count));

    return {
      props: { planetResponse, planet },
    };
  },
);
