import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";

import {
  PlanetParams,
  PartPlanetListFunc,
  ContextProps,
} from "../../types/types";
import type { RootState } from "../../app/store";
import { fetchPlanetList, isOdd } from "../../utils/utils";

import SearchString from "../searchString/SearchString";
import CardList from "../cardList/CardList";
import ErrorButton from "../errorButton/ErrorButton";
import Pagination from "../pagination/Pagination";
import { setItemsQuantity } from "../pagination/paginationSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export const DataManagerContext = createContext<Partial<ContextProps>>({});

function DataManager() {
  const ITEMS_PER_PAGE_FROM_SERVER = 10;

  const dispatch = useAppDispatch();
  const page = useAppSelector((state: RootState) => state.pagination.page);
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage,
  );
  const searchQuery = useAppSelector(
    (state: RootState) => state.search.searchQuery,
  );
  const [planetList, setPlanetList] = useState<PlanetParams[]>();
  const [isDataLoading, setIsDataLoading] = useState(false);

  const PartPlanetListFunc: PartPlanetListFunc = (part, data) => {
    const totalItems = 10;
    return part === "firstHalf"
      ? data.filter((_, i) => i < totalItems / 2)
      : data.filter((_, i) => i >= totalItems / 2);
  };

  useEffect(() => {
    const isItemsEqual = Boolean(itemsPerPage === ITEMS_PER_PAGE_FROM_SERVER);
    const pageServer = isItemsEqual ? page : Math.ceil(page / 2);
    const searchPart = `?search=${searchQuery.trim().toLowerCase()}`;
    const query = `${searchPart}&page=${pageServer}`;
    setIsDataLoading(true);
    fetchPlanetList(`${query}`)
      .then((data) => {
        const planetList = data.results;
        const part = isOdd(page) ? "firstHalf" : "secondHalf";
        const partPlanetList = PartPlanetListFunc(part, planetList);
        setPlanetList(isItemsEqual ? planetList : partPlanetList);
        dispatch(setItemsQuantity(data.count));
      })
      .catch(() => {
        console.log("Can't load planets data from API");
      })
      .finally(() => setIsDataLoading(false));
  }, [searchQuery, page, itemsPerPage, dispatch]);

  return (
    <>
      <DataManagerContext.Provider value={{ planetList }}>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString />
        <ErrorButton />
        <Pagination />
        {isDataLoading ? <h1>Loading...</h1> : <CardList />}
      </DataManagerContext.Provider>
      <Outlet />
    </>
  );
}

export default DataManager;
