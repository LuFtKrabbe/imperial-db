import styles from "./Card.module.css";
import { CardProps } from "../../types/types";

function Card(props: CardProps): JSX.Element {
  const { name, population, climate, terrain, gravity } = props.itemProp;
  //const { pageProp, itemNumProp } = props;
  //const id = url.split("/").slice(-2)[0];

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

export default Card;
