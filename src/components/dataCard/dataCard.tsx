import styles from "./dataCard.module.css";
import { DataCardProps } from "../../types/types";
import { useNavigate } from "react-router";

function DataCard(props: DataCardProps): JSX.Element {
  const { name, population, climate, terrain, gravity, url } = props.itemProp;
  const { pageProp, itemNumProp } = props;
  const id = url.split("/").slice(-2)[0];
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate(`card/?frontpage=${pageProp}&details=${itemNumProp}&id=${id}`);
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
