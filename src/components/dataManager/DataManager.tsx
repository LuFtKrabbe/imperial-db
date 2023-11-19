import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";

import {
  PlanetParams,
  PartPlanetListFunc,
  ContextProps,
} from "../../types/types";
import type { RootState } from "../../app/store";
import { isOdd } from "../../utils/utils";

import SearchString from "../searchString/SearchString";
import CardList from "../cardList/CardList";
import ErrorButton from "../errorButton/ErrorButton";
import Pagination from "../pagination/Pagination";
import { setItemsQuantity } from "../pagination/paginationSlice";
import { setLoadingPlanetList } from "../../services/loadingFlagsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { useGetPlanetListQuery } from "../../services/planet";

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

  const initialQueryParams = `?search=${searchQuery
    .trim()
    .toLowerCase()}&page=${page}`;
  const [planetList, setPlanetList] = useState<PlanetParams[]>();
  const [queryParams, setQueryParams] = useState(initialQueryParams);

  const PartPlanetListFunc: PartPlanetListFunc = (part, data) => {
    return part === "firstHalf"
      ? data.filter((_, i) => i < ITEMS_PER_PAGE_FROM_SERVER / 2)
      : data.filter((_, i) => i >= ITEMS_PER_PAGE_FROM_SERVER / 2);
  };

  const { data, error, isFetching } = useGetPlanetListQuery(`${queryParams}`);

  useEffect(() => {
    const isItemsEqual = Boolean(itemsPerPage === ITEMS_PER_PAGE_FROM_SERVER);
    const pageServer = isItemsEqual ? page : Math.ceil(page / 2);
    const searchPart = `?search=${searchQuery.trim().toLowerCase()}`;
    const queryParams = `${searchPart}&page=${pageServer}`;
    setQueryParams(queryParams);

    const planetList = data?.results || [];
    const part = isOdd(page) ? "firstHalf" : "secondHalf";
    const partPlanetList = PartPlanetListFunc(part, planetList);
    setPlanetList(isItemsEqual ? planetList : partPlanetList);
    dispatch(setItemsQuantity(data?.count || 0));
    dispatch(setLoadingPlanetList(isFetching));
  }, [data, searchQuery, page, itemsPerPage, isFetching, dispatch]);

  return (
    <>
      <DataManagerContext.Provider value={{ planetList }}>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString />
        <ErrorButton />
        <Pagination />
        {error ? (
          <h1>Can&apos;t load data</h1>
        ) : isFetching ? (
          <h1>Loading...</h1>
        ) : data ? (
          <CardList />
        ) : null}
      </DataManagerContext.Provider>
      <Outlet />
    </>
  );
}

export default DataManager;
