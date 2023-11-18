import { useEffect, useState, createContext } from "react";

import SearchString from "../searchString/SearchString";
import CardList from "../cardList/CardList";
import ErrorButton from "../errorButton/ErrorButton";
import Pagination from "../pagination/Pagination";
import { useNavigate, Outlet } from "react-router-dom";
import {
  PlanetParams,
  PartPlanetListFunc,
  ContextProps,
} from "../../types/types";
import { fetchPlanetList, isOdd } from "../../utils/utils";

export const DataManagerContext = createContext<Partial<ContextProps>>({});

function DataManager() {
  const DEFAULT_ITEMS_QUANTITY = 0;
  const DEFAULT_ITEMS_PER_PAGE = "10";

  const lastSearchQuery = localStorage.getItem("lastSearchQuery") || "";
  const [searchQuery, setSearchQuery] = useState(lastSearchQuery);
  const [itemsQuantity, setItemsQuantity] = useState<number>(
    DEFAULT_ITEMS_QUANTITY,
  );
  const [planetList, setPlanetList] = useState<PlanetParams[]>();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const goToFirstPage = () => {
    setPage(1);
    navigate(`?page=1`);
  };

  const setSearchQueryCb = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    goToFirstPage();
  };

  const setItemsPerPageCb = (itemsPerPage: string) => {
    setItemsPerPage(itemsPerPage);
    goToFirstPage();
  };

  const setPageCb = (page: number) => setPage(page);

  const PartPlanetListFunc: PartPlanetListFunc = (part, data) => {
    const totalItems = 10;
    return part === "firstHalf"
      ? data.filter((_, i) => i < totalItems / 2)
      : data.filter((_, i) => i >= totalItems / 2);
  };

  useEffect(() => {
    const pageForBackEndQuery =
      itemsPerPage === DEFAULT_ITEMS_PER_PAGE ? page : Math.ceil(page / 2);
    const searchPart = searchQuery.trim().toLowerCase();
    const query = searchPart
      ? `?search=${searchPart}&page=${pageForBackEndQuery}`
      : `?page=${pageForBackEndQuery}`;
    setIsDataLoading(true);
    fetchPlanetList(`${query}`)
      .then((data) => {
        const planetList = data.results;
        const part = isOdd(page) ? "firstHalf" : "secondHalf";
        const partPlanetList = PartPlanetListFunc(part, planetList);
        setPlanetList(
          itemsPerPage === DEFAULT_ITEMS_PER_PAGE ? planetList : partPlanetList,
        );
        setItemsQuantity(data.count);
      })
      .catch(() => {
        console.log("Can't load planets data from API");
      })
      .finally(() => setIsDataLoading(false));
  }, [searchQuery, page, itemsPerPage]);

  return (
    <>
      <DataManagerContext.Provider
        value={{ page, planetList, searchQuery, setSearchQueryCb }}
      >
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString />
        <ErrorButton />
        <Pagination
          setPageMethod={setPageCb}
          setItemsPerPageMethod={setItemsPerPageCb}
          pageProp={page}
          itemsPerPageProp={itemsPerPage}
          itemsQuantityProp={itemsQuantity}
        />
        {isDataLoading ? <h1>Loading...</h1> : <CardList />}
      </DataManagerContext.Provider>
      <Outlet />
    </>
  );
}

export default DataManager;
