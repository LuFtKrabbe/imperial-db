import React from "react";
import { Component } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";
import { DataPlanet } from "../../types/types";
/* import mockData from "../mockData"; */
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

  loadDataEndpoint = (endpoint: string): void => {
    fetch(`https://swapi.dev/api/planets/${endpoint}`)
      .then((response: Response) => {
        const result = response.json();
        return result;
      })
      .then((data) => {
        console.log(data.results);
        this.setState({
          planetData: data.results,
        });
      });
  };

  loadData = () => {
    if (this.state.currentQuery === "") {
      this.loadDataEndpoint("?page=1");
    } else {
      const searchPart = this.state.currentQuery?.trim().toLowerCase();
      this.loadDataEndpoint(`?search=${searchPart}`);
    }
  };

  /*     this.setState({
    planetData: mockData,
  }); */

  componentDidMount(): void {
    this.loadData();
  }

  render() {
    return (
      <>
        <SearchString></SearchString>
        <ErrorButton></ErrorButton>
        <ResultsDisplay planetData={this.state.planetData}></ResultsDisplay>
      </>
    );
  }
}

export default DataManager;
