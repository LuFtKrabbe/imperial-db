import { Component } from "react";

import styles from "./resultsDisplay.module.css";
import DataCard from "../dataCard/dataCard";
import { DataPlanet } from "../../types/types";

class ResultsDisplay extends Component<
  Record<string, Array<DataPlanet> | string>,
  { planet: Array<DataPlanet> | string }
> {
  constructor(props: Record<string, Array<DataPlanet> | string>) {
    super(props);
    this.state = {
      planet: this.props.planetData,
    };
  }

  static getDerivedStateFromProps(props: Record<string, string>) {
    return {
      planet: props.planetData,
    };
  }

  render() {
    let data = this.state.planet;
    if (data.length === 0) {
      data = "---Nothing data has been found---";
    }
    return (
      <>
        <div className={styles.displayContainer}>
          {typeof data != "string"
            ? data.map((planet, index) => (
                <DataCard card={planet} key={index} />
              ))
            : data}
        </div>
      </>
    );
  }
}

export default ResultsDisplay;
