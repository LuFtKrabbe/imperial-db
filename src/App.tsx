import { Component } from "react";
import "./App.css";
import DataManager from "./components/dataManager/dataManager";
import ErrorBoundary from "./components/ErrorBoundary";

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <DataManager></DataManager>
      </ErrorBoundary>
    );
  }
}

export default App;
