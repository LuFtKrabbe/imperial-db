import { useEffect, useState } from "react";

import SearchString from "../searchString/SearchString";
import ResultsDisplay from "../resultsDisplay/ResultsDisplay";
import ErrorButton from "../errorButton/ErrorButton";
import Pagination from "../pagination/Pagination";
import { useNavigate, Outlet } from "react-router-dom";
import { DataPlanet, GetPartPlanetData } from "../../types/types";
import { fetchPlanetData, isOdd } from "../../utils/utils";

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

  const getPartPlanetData: GetPartPlanetData = (part, data) => {
    const totalItems = 10;
    return part === "firstHalf"
      ? data.filter((_, i) => i < totalItems / 2)
      : data.filter((_, i) => i >= totalItems / 2);
  };

  useEffect(() => {
    const pageForBackEndQuery =
      itemsPerPage === "10" ? page : Math.ceil(page / 2);
    const searchPart = searchQuery.trim().toLowerCase();
    const query = searchPart
      ? `?search=${searchPart}&page=${pageForBackEndQuery}`
      : `?page=${pageForBackEndQuery}`;
    setIsDataLoading(true);
    fetchPlanetData(`${query}`)
      .then((data) => {
        const planetData = data.results;
        const part = isOdd(page) ? "firstHalf" : "secondHalf";
        const partPlanetData = getPartPlanetData(part, planetData);
        setPlanetData(itemsPerPage === "10" ? planetData : partPlanetData);
        setItemsQuantity(data.count);
      })
      .catch(() => {
        console.log("Can't load planets data from API");
        alert("Data couldn't be loaded. Check the console log!");
      })
      .finally(() => setIsDataLoading(false));
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
          pageProp={page}
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
