import { useContext } from "react";

import styles from "./CardList.module.css";
import Card from "../card/Card";
import { DataManagerContext } from "../dataManager/DataManager";

function CardList(): JSX.Element {
  const { page, planetList } = useContext(DataManagerContext);

  return (
    <div className={styles.displayContainer} role={"cardList"}>
      {planetList && planetList.length ? (
        planetList.map((planet, i) => (
          <Card
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

export default CardList;
