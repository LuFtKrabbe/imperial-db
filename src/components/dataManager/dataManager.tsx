import React from "react";
import { Component } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";

class DataManager extends Component<
  Record<string, never>,
  { currentQuery: string | null; planetData: Array<string> }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      currentQuery: localStorage.getItem("lastQuery")
        ? localStorage.getItem("lastQuery")
        : "",
      planetData: ["Planet1", "Planet2"],
    };
  }

  loadData = () => {
    this.setState({
      planetData: ["Planet1", "Planet2"],
    });
    /*     fetch("https://swapi.dev/api/planets/?page=1")
      .then((response: Response) => {
        const result = response.json();
        return result;
      })
      .then((data) => {
        console.log(data.results);

      }); */
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
