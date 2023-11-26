import styles from "./Card.module.css";
import { CardProps } from "../../types/types";
import { useRouter } from "next/router";

function Card(props: CardProps): JSX.Element {
  const { name, population, climate, terrain, gravity, url } = props.itemProp;
  const id = url.split("/").slice(-2)[0];
  const router = useRouter();

  return (
    <div className={styles.card} onClick={() => router.push(`/card/${id}`)}>
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
