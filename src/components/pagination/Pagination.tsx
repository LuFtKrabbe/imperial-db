import styles from "./Pagination.module.css";
import { PaginationProps } from "../../types/types";
import { Link } from "react-router-dom";
import { createArrToNum } from "../../utils/utils";

import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setPage, setItemsPerPage } from "./paginationSlice";

function Pagination(props: PaginationProps): JSX.Element {
  const page = useAppSelector((state: RootState) => state.pagination.page);
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage,
  );
  const dispatch = useAppDispatch();

  const pagesQuantity = Math.ceil(props.itemsQuantityProp / itemsPerPage);
  const arr = createArrToNum(pagesQuantity);

  return (
    <div className={styles.pagination}>
      <nav className={styles.paginationPages}>
        {arr.map((pageNum) => {
          return (
            <Link
              className={pageNum === page ? styles.pageActive : styles.page}
              key={pageNum}
              to={`?page=${pageNum}`}
              onClick={() => dispatch(setPage(pageNum))}
            >
              {pageNum}
            </Link>
          );
        })}
      </nav>
      <div className={styles.paginationQuantities}>
        <button
          className={styles.paginationQuantity}
          onClick={() => dispatch(setItemsPerPage(5))}
        >
          5
        </button>
        <button
          className={styles.paginationQuantity}
          onClick={() => dispatch(setItemsPerPage(10))}
        >
          10
        </button>
      </div>
    </div>
  );
}

export default Pagination;
