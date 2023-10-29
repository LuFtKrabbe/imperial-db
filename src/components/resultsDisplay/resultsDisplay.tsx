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

  displayData = () => {
    this.setState({
      planet: this.props.planetData,
    });
  };

  componentDidMount(): void {
    this.displayData();
  }

  render() {
    return (
      <>
        <div className={styles.displayContainer}>
          <div className={styles.result}>
            {typeof this.state.planet != "string"
              ? this.state.planet.map((planet, index) => (
                  <DataCard card={planet} key={index} />
                ))
              : this.state.planet}
          </div>
        </div>
      </>
    );
  }
}

export default ResultsDisplay;
