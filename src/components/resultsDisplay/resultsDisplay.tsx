import { Component } from "react";

import styles from "./resultsDisplay.module.css";
import DataCard from "../dataCard/dataCard";
import { DataPlanet } from "../../types/types";

class ResultsDisplay extends Component<
  Record<string, Array<DataPlanet> | string>
> {
  constructor(props: Record<string, Array<DataPlanet> | string>) {
    super(props);
  }

  render() {
    let data = this.props.planetData;
    if (data.length === 0) {
      data = "--- Nothing data has been found ---";
    }
    return (
      <div className={styles.displayContainer}>
        {typeof data != "string"
          ? data.map((planet, i) => <DataCard card={planet} key={i} />)
          : data}
      </div>
    );
  }
}

export default ResultsDisplay;
