import styles from "./dataCard.module.css";
import { DataPlanet } from "../../types/types";

function DataCard(props: { card: DataPlanet; key: number }): JSX.Element {
  const { name, population, climate, terrain, gravity } = props.card;

  return (
    <div className={styles.card}>
      <div className={styles.name}>{name}</div>
      <div className={styles.gravity}>Gravity: {gravity}</div>
      <div className={styles.population}>Population: {population}</div>
      <div className={styles.description}>
        Description: Planet has the {climate} climate and represents {terrain}{" "}
        as a surface
      </div>
    </div>
  );
}

export default DataCard;
