import React from "react";
import { Component } from "react";

import SearchString from "../searchString/searchString";
import ResultsDisplay from "../resultsDisplay/resultsDisplay";

class DataManager extends Component<
  Record<string, never>,
  { currentQuery: string | null; planetData: string }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      currentQuery: localStorage.getItem("lastQuery")
        ? localStorage.getItem("lastQuery")
        : "",
      planetData: "Planet",
    };
  }

  setQueryString = (queryString: string) => {
    this.setState({
      currentQuery: queryString,
    });
  };

  loadData = () => {
    this.setState({
      planetData: this.state.currentQuery
        ? this.state.currentQuery
        : "Nothing found",
    });
  };

  componentDidMount(): void {
    console.log(this.state.currentQuery);
    this.loadData();
  }

  render() {
    console.log(this.state.currentQuery);
    console.log(this.state.planetData);
    return (
      <>
        <SearchString setQueryString={this.setQueryString}></SearchString>
        <ResultsDisplay planetData={this.state.planetData}></ResultsDisplay>
      </>
    );
  }
}

export default DataManager;
