import { Component } from "react";

import styles from "./resultsDisplay.module.css";

class ResultsDisplay extends Component {
  render() {
    return (
      <>
        <div className={styles.displayContainer}>
          <div className={styles.result}></div>
        </div>
      </>
    );
  }
}

export default ResultsDisplay;
