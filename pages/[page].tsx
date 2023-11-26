import { wrapper } from "../src/app/store";
import {
  getPlanetById,
  getPlanetList,
  getRunningQueriesThunk,
} from "../src/services/planetApi";
import CardList from "../src/components/cardList/CardList";
import { setItemsQuantity } from "../src/components/pagination/paginationSlice";
import {
  PartPlanetListFunc,
  PlanetParams,
  PlanetResponse,
} from "../src/types/types";
import Pagination from "../src/components/pagination/Pagination";
import DetailedCard from "../src/components/detailedCard/DetailedCard";
import SearchString from "../src/components/searchString/SearchString";
import { isOdd } from "../src/utils/utils";

function Page({
  planetList,
  planet,
  itemsPerPage,
  searchQuery,
}: {
  planetList: PlanetParams[];
  planet: PlanetParams;
  itemsPerPage: number;
  searchQuery: string;
}) {
  return (
    <>
      <h1>IMPERIAL PLANETARY DATABASE</h1>
      <SearchString />
      <Pagination itemsPerPage={itemsPerPage} searchQuery={searchQuery} />
      <CardList planetList={planetList} />
      {planet ? <DetailedCard planet={planet} /> : <></>}
    </>
  );
}

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const ITEMS_PER_PAGE_FROM_SERVER = 10;

    const url = context.params?.page as string;

    const searchQuery = url.split("&")[0].split("=")[1];
    const page = Number(url.split("&").slice(0, 2)[1].split("=")[1]);
    const itemsPerPage =
      url.split("&").slice(0, 3)[2].split("=")[1] === "10" ? 10 : 5;

    const isCard = url.includes("card");
    const id = isCard ? url.split("=").slice(-1)[0] : null;

    const isItemsEqual = Boolean(itemsPerPage === ITEMS_PER_PAGE_FROM_SERVER);
    const serverPage = isItemsEqual ? page : Math.ceil(page / 2);

    const response = await store.dispatch(
      getPlanetList.initiate(`?search=${searchQuery}&page=${serverPage}`),
    );
    const planetResponse = response.data as PlanetResponse;

    const responsePlanet = await store.dispatch(
      getPlanetById.initiate(`${id}`),
    );
    const planet = isCard ? (responsePlanet.data as PlanetParams) : null;

    const PartPlanetListFunc: PartPlanetListFunc = (part, data) => {
      return part === "firstHalf"
        ? data.filter((_, i) => i < ITEMS_PER_PAGE_FROM_SERVER / 2)
        : data.filter((_, i) => i >= ITEMS_PER_PAGE_FROM_SERVER / 2);
    };

    const allPlanetList = planetResponse.results || [];
    const part = isOdd(page) ? "firstHalf" : "secondHalf";
    const partPlanetList = PartPlanetListFunc(part, allPlanetList);

    const planetList = isItemsEqual ? allPlanetList : partPlanetList;

    store.dispatch(setItemsQuantity(planetResponse.count));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { planetList, planet, itemsPerPage, searchQuery },
    };
  },
);
