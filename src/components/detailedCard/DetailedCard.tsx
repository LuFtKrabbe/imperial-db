import styles from "./DetailedCard.module.css";
import { PlanetParams } from "../../types/types";
import { useRouter } from "next/router";

function DetailedCard({ planet }: { planet: PlanetParams }): JSX.Element {
  const router = useRouter();

  return (
    <>
      <div className={styles.detailedCard}>
        <div
          role="detailedCardCurtain"
          className={styles.curtain}
          onClick={() => router.back()}
        ></div>
        <div className={styles.panel} role="detailedCardPanel">
          <div className={styles.nameListContainer}>
            <h1 className={styles.name}>{planet.name}</h1>
            <div className={styles.list}>
              <div>Rotation period: {planet.rotation_period}</div>
              <div>Orbital Period: {planet.orbital_period}</div>
              <div>Diameter: {planet.diameter}</div>
              <div>Climate: {planet.climate}</div>
              <div>Gravity: {planet.gravity}</div>
              <div>Terrain: {planet.terrain}</div>
              <div>Surface water: {planet.surface_water}</div>
              <div>Population: {planet.population}</div>
            </div>
          </div>
          <button className={styles.closeButton} onClick={() => router.back()}>
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailedCard;
