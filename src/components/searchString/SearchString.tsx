import React, { useState, useContext } from "react";
import styles from "./SearchString.module.css";
import { DataManagerContext } from "../dataManager/DataManager";

function SearchString(): JSX.Element {
  const { searchQuery, setSearchQueryCb } = useContext(DataManagerContext);
  const [query, setQuery] = useState(searchQuery);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    event.preventDefault();
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (setSearchQueryCb && query !== undefined) {
      setSearchQueryCb(query);
      localStorage.setItem("lastSearchQuery", query);
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            onChange={onInputChange}
            placeholder="Enter the planet name..."
            value={query}
            type="text"
          ></input>
          <button className={styles.searchButton} type="submit">
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchString;
