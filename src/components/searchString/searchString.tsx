import React, { useState } from "react";

import styles from "./searchString.module.css";

function SearchString(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("lastSearchQuery") || "",
  );

  const onInputStringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchQuery(event.target.value);
  };

  const onFormSubmit = (): void => {
    if (searchQuery || searchQuery === "") {
      localStorage.setItem("lastSearchQuery", searchQuery);
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            onChange={onInputStringChange}
            placeholder="Enter the planet name..."
            value={searchQuery}
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
