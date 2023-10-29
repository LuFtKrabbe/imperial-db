import React from "react";
import { Component } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";
import { DataPlanet } from "../../types/types";
import mockData from "../mockData";

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

  loadData = () => {
    /*     fetch("https://swapi.dev/api/planets/?page=1")
      .then((response: Response) => {
        const result = response.json();
        return result;
      })
      .then((data) => {
        console.log(data.results);
        this.setState({
          planetData: data.results,
        });
      }); */
    this.setState({
      planetData: mockData,
    });
  };

  componentDidMount(): void {
    this.loadData();
  }

  render() {
    return (
      <>
        <SearchString></SearchString>
        <ResultsDisplay planetData={this.state.planetData}></ResultsDisplay>
      </>
    );
  }
}

export default DataManager;
