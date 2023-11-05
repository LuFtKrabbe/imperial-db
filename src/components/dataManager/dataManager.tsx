import { useEffect, useState } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";
import ErrorButton from "../errorButton/errorButton";
import Pagination from "../pagination/Pagination";
import { useNavigate, Outlet } from "react-router-dom";
import { DataPlanet, LoadData } from "../../types/types";

function DataManager() {
  const lastSearchQuery = localStorage.getItem("lastSearchQuery") || "";

  const [searchQuery, setSearchQuery] = useState(lastSearchQuery);
  const [itemsQuantity, setItemsQuantity] = useState<number>(0);
  const [planetData, setPlanetData] = useState<DataPlanet[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const goToFirstPage = () => {
    setPage(1);
    navigate(`?page=1`);
  };

  const setSearchQueryCb = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    localStorage.setItem("lastSearchQuery", searchQuery);
    goToFirstPage();
  };

  const setItemsPerPageCb = (itemsPerPage: string) => {
    setItemsPerPage(itemsPerPage);
    goToFirstPage();
  };

  const setPageCb = (page: number) => setPage(page);

  const loadData: LoadData = (query, page, itemsPerPage) => {
    setIsDataLoading(true);
    fetch(`https://swapi.dev/api/planets/${query}`)
      .then((response: Response) => response.json())
      .then((data) => {
        const planetData: DataPlanet[] = data.results;
        const filteredData =
          page % 2
            ? planetData.filter((val, i) => i < 5)
            : planetData.filter((val, i) => i >= 5);
        setPlanetData(itemsPerPage === "10" ? planetData : filteredData);
        setItemsQuantity(Number(data.count));
        setIsDataLoading(false);
      })
      .catch(() => {
        console.log("Can't load data for DetailedCard");
        alert("Data couldn't be loaded. Check the console log!");
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
    loadData(query, page, itemsPerPage);
  }, [searchQuery, page, itemsPerPage]);

  return (
    <>
      <div>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString
          setSearchQueryMethod={setSearchQueryCb}
          searchQueryProp={searchQuery}
        />
        <ErrorButton />
        <Pagination
          setPageMethod={setPageCb}
          setItemsPerPageMethod={setItemsPerPageCb}
          itemsPerPageProp={itemsPerPage}
          itemsQuantityProp={itemsQuantity}
        />
        {isDataLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ResultsDisplay planetDataProp={planetData} pageProp={page} />
        )}
      </div>
      <Outlet />
    </>
  );
}

export default DataManager;
