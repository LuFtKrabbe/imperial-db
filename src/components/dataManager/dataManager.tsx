import { useCallback, useEffect, useState } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";
import ErrorButton from "../errorButton/errorButton";
import Pagination from "../pagination/Pagination";
import { DataPlanet } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function DataManager() {
  console.log("Data Manager is loaded");
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("lastSearchQuery") || "",
  );

  const navigate = useNavigate();
  const [itemsQuantity, setItemsQuantity] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [resultData, setResultData] = useState<DataPlanet[]>([]);

  const setSearchQueryCb = useCallback((searchQuery: string) => {
    setSearchQuery(searchQuery);
    if (searchQuery || searchQuery === "") {
      localStorage.setItem("lastSearchQuery", searchQuery);
    }
  }, []);

  const setItemsPerPageCb = useCallback(
    (itemsPerPage: string) => {
      setItemsPerPage(itemsPerPage);
      setPage(1);
      navigate(`?page=1`);
    },
    [navigate],
  );

  const setPageCb = useCallback((Page: string) => {
    setPage(Number(Page));
  }, []);

  const loadData = (
    endpoint: string,
    itemsPerPage = "10",
    currentPage: number,
  ) => {
    setIsDataLoading(true);
    console.log("_________Data SEARCH__________");
    fetch(`https://swapi.dev/api/planets/${endpoint}`)
      .then((response: Response) => response.json())
      .then((data) => {
        const resultData: DataPlanet[] = data.results;
        const filteredData =
          currentPage % 2
            ? resultData.filter((val, i) => i < 5)
            : resultData.filter((val, i) => i >= 5);
        setResultData(itemsPerPage === "10" ? resultData : filteredData);
        setItemsQuantity(Number(data.count));
        setIsDataLoading(false);
      });
  };

  useEffect(() => {
    const pageForBackEndQuery =
      itemsPerPage === "10" ? page : Math.ceil(page / 2);
    const searchPart = searchQuery.trim().toLowerCase();
    const query = searchPart
      ? `?search=${searchPart}&page=${pageForBackEndQuery}`
      : `?page=${pageForBackEndQuery}`;
    loadData(query, itemsPerPage, page);
  }, [searchQuery, itemsPerPage, page]);

  return (
    <>
      <div>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString
          setSearchQueryMethod={setSearchQueryCb}
          searchQueryProp={searchQuery}
        />
        <ErrorButton />
        {
          <Pagination
            setPageMethod={setPageCb}
            setItemsPerPageMethod={setItemsPerPageCb}
            itemsPerPageProp={itemsPerPage}
            itemsQuantityProp={itemsQuantity}
          />
        }
        {isDataLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ResultsDisplay planetData={resultData} pageProp={page} />
        )}
      </div>
      <Outlet />
    </>
  );
}

export default DataManager;
