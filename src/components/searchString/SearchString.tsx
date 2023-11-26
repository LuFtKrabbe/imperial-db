import { useAppDispatch } from "../../app/hooks";
import { setSearchQuery } from "./searchSlice";
import { setPage } from "../pagination/paginationSlice";

import styles from "./SearchString.module.css";
import { useRouter } from "next/router";

function SearchString(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const query = event.currentTarget.query.value;

    dispatch(setPage(1));
    dispatch(setSearchQuery(query));
    router.push(`search=${query}&page=1&limit=10`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.searchContainer}>
          <input
            name="query"
            className={styles.searchInput}
            placeholder="Enter the planet name..."
            type="text"
          ></input>
          <button className={styles.searchButton}>Search</button>
        </div>
      </form>
    </>
  );
}

export default SearchString;
