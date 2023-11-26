import { createArrToNum } from "../../utils/utils";

import Link from "next/link";

import type { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

import styles from "./Pagination.module.css";

function Pagination({
  itemsPerPage,
  searchQuery,
}: {
  itemsPerPage: number;
  searchQuery: string;
}): JSX.Element {
  const itemsQuantity = useAppSelector(
    (state: RootState) => state.pagination.itemsQuantity,
  );

  const pagesQuantity = Math.ceil(itemsQuantity / itemsPerPage);
  const arrPages = createArrToNum(pagesQuantity);

  return (
    <div className={styles.pagination}>
      <nav className={styles.paginationPages}>
        {arrPages.map((pageNum) => {
          return (
            <Link
              className={styles.page}
              key={pageNum}
              href={`/search=${searchQuery}&page=${pageNum}&limit=${itemsPerPage}`}
            >
              {pageNum}
            </Link>
          );
        })}
      </nav>
      <div className={styles.paginationQuantities}>
        <Link
          className={styles.paginationQuantity}
          href={`/search=${searchQuery}&page=1&limit=5`}
        >
          5
        </Link>
        <Link
          className={styles.paginationQuantity}
          href={`/search=${searchQuery}&page=1&limit=10`}
        >
          10
        </Link>
      </div>
    </div>
  );
}

export default Pagination;
