import styles from "./CardList.module.css";
import Card from "../card/Card";

import { PlanetParams } from "../../types/types";

function CardList({ planetList }: Record<string, PlanetParams[]>): JSX.Element {
  return (
    <div className={styles.displayContainer} role={"cardList"}>
      {planetList && planetList.length ? (
        planetList.map((planet) => <Card key={planet.name} itemProp={planet} />)
      ) : (
        <h1>Nothing data has been found</h1>
      )}
    </div>
  );
}

export default CardList;
