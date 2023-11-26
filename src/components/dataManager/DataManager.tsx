import { createContext } from "react";

import { ContextProps } from "../../types/types";
/* import type { RootState } from "../../app/store";
import { isOdd } from "../../utils/utils"; */

/* import SearchString from "../searchString/SearchString"; */
import CardList from "../cardList/CardList";
/* import ErrorButton from "../errorButton/ErrorButton"; */
//import Pagination from "../pagination/Pagination";
/* import { setItemsQuantity } from "../pagination/paginationSlice";
import { setLoadingPlanetList } from "../../services/loadingFlagsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
 */
import { useGetPlanetListQuery } from "../../services/planetApi";

export const DataManagerContext = createContext<Partial<ContextProps>>({});

function DataManager() {
  const result = useGetPlanetListQuery("");
  const { data } = result;
  const planetList = data?.results || [];
  /*   const ITEMS_PER_PAGE_FROM_SERVER = 10;

  const dispatch = useAppDispatch();
  const page = useAppSelector((state: RootState) => state.pagination.page);
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage,
  );
  const searchQuery = useAppSelector(
    (state: RootState) => state.search.searchQuery,
  );

  const initSearchPart = `?search=${searchQuery.trim().toLowerCase()}`;
  const initQueryParams = `${initSearchPart}&page=${page}`;

  const [planetList, setPlanetList] = useState<PlanetParams[]>();
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const PartPlanetListFunc: PartPlanetListFunc = (part, data) => {
    return part === "firstHalf"
      ? data.filter((_, i) => i < ITEMS_PER_PAGE_FROM_SERVER / 2)
      : data.filter((_, i) => i >= ITEMS_PER_PAGE_FROM_SERVER / 2);
  };

  const { data, error, isFetching } = useGetPlanetListQuery(`${queryParams}`);

  if (error) {
    throw new Error("Can't load data for CardList");
  }

  useEffect(() => {
    const isItemsEqual = Boolean(itemsPerPage === ITEMS_PER_PAGE_FROM_SERVER);
    const serverPage = isItemsEqual ? page : Math.ceil(page / 2);
    const searchPart = `?search=${searchQuery.trim().toLowerCase()}`;
    const queryParams = `${searchPart}&page=${serverPage}`;
    setQueryParams(queryParams);

    const planetList = data?.results || [];
    const part = isOdd(page) ? "firstHalf" : "secondHalf";
    const partPlanetList = PartPlanetListFunc(part, planetList);

    setPlanetList(isItemsEqual ? planetList : partPlanetList);

    dispatch(setItemsQuantity(data?.count || 0));
    dispatch(setLoadingPlanetList(isFetching));
  }, [isFetching, data, searchQuery, page, itemsPerPage, dispatch]); */

  return (
    <>
      {/* <SearchString /> */}
      {/* <ErrorButton /> */}
      <CardList planetList={planetList} />
    </>
  );
}

export default DataManager;
