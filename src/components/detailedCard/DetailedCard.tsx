import styles from "./detailedCard.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { DataPlanet } from "../../types/types";

function DetailedCard(): JSX.Element {
  const [searchParams] = useSearchParams();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [resultData, setResultData] = useState<DataPlanet>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${searchParams.get("id")}`)
      .then((response: Response) => response.json())
      .then((data) => {
        setResultData(data);
        setIsDataLoading(false);
      })
      .catch(() => {
        console.log("Can't load data for DetailedCard");
        alert("Data couldn't be loaded. Check the console log!");
        setIsDataLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <div className={styles.detailedCard}>
        <div
          className={styles.curtain}
          onClick={() => {
            navigate(-1);
          }}
        ></div>
        <div className={styles.panel}>
          {isDataLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className={styles.nameListContainer}>
              <h1 className={styles.name}>{resultData?.name}</h1>
              <div className={styles.list}>
                <div>Rotation period: {resultData?.rotation_period}</div>
                <div>Orbital Period: {resultData?.orbital_period}</div>
                <div>Diameter: {resultData?.diameter}</div>
                <div>Climate: {resultData?.climate}</div>
                <div>Gravity: {resultData?.gravity}</div>
                <div>Terrain: {resultData?.terrain}</div>
                <div>Surface water: {resultData?.surface_water}</div>
                <div>Population: {resultData?.population}</div>
              </div>
            </div>
          )}
          <button
            className={styles.closeButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailedCard;
