import { Component } from "react";
import "./App.css";
import SearchString from "./components/searchString/searchString";
import ResultsDisplay from "./components/resultsDisplay/resultsDisplay";

class App extends Component {
  render() {
    return (
      <>
        <SearchString></SearchString>
        <ResultsDisplay></ResultsDisplay>
      </>
    );
  }
}

export default App;
