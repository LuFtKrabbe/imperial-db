import styles from "./detailedCard.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { DataPlanet } from "../../types/types";

function DetailedCard(): JSX.Element {
  console.log("DETAILED is loaded");
  const [searchParams] = useSearchParams();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [resultData, setResultData] = useState<DataPlanet>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchParams.get("id"));
    fetch(`https://swapi.dev/api/planets/${searchParams.get("id")}`)
      .then((response: Response) => response.json())
      .then((data) => {
        setResultData(data);
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
          {isDataLoading ? <h1>Loading...</h1> : <div>{resultData?.name}</div>}
          <button
            className={styles.closeButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailedCard;
