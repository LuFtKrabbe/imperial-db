import { Link, useNavigate } from "react-router-dom";

import { createArrToNum } from "../../utils/utils";

import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setPage, setItemsPerPage } from "./paginationSlice";

import styles from "./Pagination.module.css";

function Pagination(): JSX.Element {
  const page = useAppSelector((state: RootState) => state.pagination.page);
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage,
  );
  const itemsQuantity = useAppSelector(
    (state: RootState) => state.pagination.itemsQuantity,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pagesQuantity = Math.ceil(itemsQuantity / itemsPerPage);
  const arrPages = createArrToNum(pagesQuantity);

  return (
    <div className={styles.pagination}>
      <nav className={styles.paginationPages}>
        {arrPages.map((pageNum) => {
          return (
            <Link
              className={pageNum === page ? styles.pageActive : styles.page}
              key={pageNum}
              to={`?page=${pageNum}`}
              onClick={() => {
                dispatch(setPage(pageNum));
              }}
            >
              {pageNum}
            </Link>
          );
        })}
      </nav>
      <div className={styles.paginationQuantities}>
        <button
          className={styles.paginationQuantity}
          onClick={() => {
            navigate(`?page=1`);
            dispatch(setPage(1));
            dispatch(setItemsPerPage(5));
          }}
        >
          5
        </button>
        <button
          className={styles.paginationQuantity}
          onClick={() => {
            navigate(`?page=1`);
            dispatch(setPage(1));
            dispatch(setItemsPerPage(10));
          }}
        >
          10
        </button>
      </div>
    </div>
  );
}

export default Pagination;
