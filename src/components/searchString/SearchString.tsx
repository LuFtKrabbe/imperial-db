import { useState } from "react";
import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setSearchQuery } from "./searchSlice";
import { setPage } from "../pagination/paginationSlice";

import styles from "./SearchString.module.css";

function SearchString(): JSX.Element {
  const searchQuery = useAppSelector(
    (state: RootState) => state.search.searchQuery,
  );

  const dispatch = useAppDispatch();

  const [query, setQuery] = useState(searchQuery);

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter the planet name..."
          value={query}
          type="text"
        ></input>
        <button
          className={styles.searchButton}
          onClick={() => {
            dispatch(setPage(1));
            dispatch(setSearchQuery(query));
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchString;
