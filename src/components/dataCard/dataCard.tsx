import styles from "./dataCard.module.css";
import { DataPlanet } from "../../types/types";
import { useNavigate } from "react-router";

function DataCard(props: {
  card: DataPlanet;
  key: string;
  cardNumProp: number;
  pageProp: number;
}): JSX.Element {
  const { name, population, climate, terrain, gravity, url } = props.card;
  const { pageProp, cardNumProp } = props;
  const id = url.split("/").slice(-2)[0];
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate(`card/?frontpage=${pageProp}&details=${cardNumProp}&id=${id}`);
      }}
    >
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
