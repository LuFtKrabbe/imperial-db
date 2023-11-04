import styles from "./resultsDisplay.module.css";
import DataCard from "../dataCard/dataCard";
import { DataPlanet } from "../../types/types";

function ResultsDisplay(props: Record<string, Array<DataPlanet>>): JSX.Element {
  const planetData = props.planetData;
  const messageNothingFound = "--- Nothing data has been found ---";

  return (
    <div className={styles.displayContainer}>
      {planetData.length
        ? planetData.map((planet, i) => <DataCard card={planet} key={i} />)
        : messageNothingFound}
    </div>
  );
}

export default ResultsDisplay;
