import { Component } from "react";

import styles from "./resultsDisplay.module.css";
import DataCard from "../dataCard/dataCard";

class ResultsDisplay extends Component<
  Record<string, Array<string>>,
  { planet: Array<string> }
> {
  constructor(props: Record<string, Array<string>>) {
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
            {this.state.planet.map((planet, index) => (
              <DataCard card={planet} key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ResultsDisplay;
