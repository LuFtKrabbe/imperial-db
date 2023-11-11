import { useContext } from "react";

import styles from "./ResultsDisplay.module.css";
import DataCard from "../dataCard/DataCard";
import { DataManagerContext } from "../dataManager/DataManager";

function ResultsDisplay(): JSX.Element {
  const { page, planetData } = useContext(DataManagerContext);

  return (
    <div className={styles.displayContainer}>
      {planetData && planetData.length ? (
        planetData.map((planet, i) => (
          <DataCard
            key={planet.name}
            itemProp={planet}
            itemNumProp={i + 1}
            pageProp={page || 1}
          />
        ))
      ) : (
        <h1>Nothing data has been found</h1>
      )}
    </div>
  );
}

export default ResultsDisplay;
