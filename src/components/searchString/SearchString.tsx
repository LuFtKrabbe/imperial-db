import React, { useState } from "react";
import { SearchStringProps } from "../../types/types";
import styles from "./SearchString.module.css";

function SearchString(props: SearchStringProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState(props.searchQueryProp);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
    event.preventDefault();
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.setSearchQueryMethod(searchQuery);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            onChange={onInputChange}
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
