import { Component } from "react";

import styles from "./resultsDisplay.module.css";

class ResultsDisplay extends Component<
  Record<string, string>,
  { planet: string }
> {
  constructor(props: Record<string, string>) {
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
          <div className={styles.result}>{this.state.planet}</div>
        </div>
      </>
    );
  }
}

export default ResultsDisplay;
