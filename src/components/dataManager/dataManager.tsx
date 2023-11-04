import { useState } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";
import ErrorButton from "../errorButton/errorButton";

function DataManager() {
  const currentSearchQuery = localStorage.getItem("lastSearchQuery") || "";
  const [resultData, setResultData] = useState([]);

  const loadDataEndpoint = (endpoint: string) => {
    fetch(`https://swapi.dev/api/planets/${endpoint}`)
      .then((response: Response) => response.json())
      .then((data) => {
        setResultData(data.results);
      });
  };

  const loadData = () => {
    const searchPart = currentSearchQuery.trim().toLowerCase();
    const query = searchPart ? `?search=${searchPart}` : "?page=1";
    loadDataEndpoint(query);
  };

  loadData();

  return (
    <>
      <h1>IMPERIAL PLANETARY DATABASE</h1>
      <SearchString></SearchString>
      <ErrorButton></ErrorButton>
      <ResultsDisplay planetData={resultData}></ResultsDisplay>
    </>
  );
}

export default DataManager;
