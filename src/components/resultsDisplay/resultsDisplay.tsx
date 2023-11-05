import styles from "./resultsDisplay.module.css";
import DataCard from "../dataCard/dataCard";
import { DataPlanet } from "../../types/types";

function ResultsDisplay(props: {
  planetData: Array<DataPlanet>;
  pageProp: number;
}): JSX.Element {
  console.log("Display is loaded");
  const planetData = props.planetData;

  return (
    <div className={styles.displayContainer}>
      {planetData.length ? (
        planetData.map((planet, i) => (
          <DataCard
            key={planet.name}
            card={planet}
            cardNumProp={i + 1}
            pageProp={props.pageProp}
          />
        ))
      ) : (
        <h1>Nothing data has been found</h1>
      )}
    </div>
  );
}

export default ResultsDisplay;
