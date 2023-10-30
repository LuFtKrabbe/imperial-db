import { Component } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";
import { DataPlanet } from "../../types/types";
import ErrorButton from "../errorButton/errorButton";

class DataManager extends Component<
  Record<string, never>,
  { currentQuery: string | null; planetData: Array<DataPlanet> | string }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      currentQuery: localStorage.getItem("lastQuery")
        ? localStorage.getItem("lastQuery")
        : "",
      planetData: "Searching...",
    };
  }

  loadDataEndpoint = (endpoint: string) => {
    fetch(`https://swapi.dev/api/planets/${endpoint}`)
      .then((response: Response) => response.json())
      .then((data) => {
        this.setState({
          planetData: data.results,
        });
      });
  };

  loadData = () => {
    if (this.state.currentQuery !== "" && this.state.currentQuery) {
      const searchPart = this.state.currentQuery.trim().toLowerCase();
      this.loadDataEndpoint(`?search=${searchPart}`);
    } else {
      this.loadDataEndpoint("?page=1");
    }
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString></SearchString>
        <ErrorButton></ErrorButton>
        <ResultsDisplay planetData={this.state.planetData}></ResultsDisplay>
      </>
    );
  }
}

export default DataManager;
