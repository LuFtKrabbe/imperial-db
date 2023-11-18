import { useContext } from "react";

import styles from "./CardList.module.css";
import Card from "../card/Card";
import { DataManagerContext } from "../dataManager/DataManager";

import type { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

function CardList(): JSX.Element {
  const { planetList } = useContext(DataManagerContext);
  const page = useAppSelector((state: RootState) => state.pagination.page);

  return (
    <div className={styles.displayContainer} role={"cardList"}>
      {planetList && planetList.length ? (
        planetList.map((planet, i) => (
          <Card
            key={planet.name}
            itemProp={planet}
            itemNumProp={i + 1}
            pageProp={page}
          />
        ))
      ) : (
        <h1>Nothing data has been found</h1>
      )}
    </div>
  );
}

export default CardList;
