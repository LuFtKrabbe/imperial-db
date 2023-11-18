import styles from "./Pagination.module.css";
import { PaginationProps } from "../../types/types";
import { Link } from "react-router-dom";
import { createArrToNum } from "../../utils/utils";

import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { switchTo5, switchTo10 } from "./paginationSlice";

function Pagination(props: PaginationProps): JSX.Element {
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.value,
  );
  const dispatch = useAppDispatch();

  const pagesQuantity =
    itemsPerPage === "10"
      ? Math.ceil(props.itemsQuantityProp / 10)
      : Math.ceil(props.itemsQuantityProp / 5);
  const arr = createArrToNum(pagesQuantity);

  return (
    <div className={styles.pagination}>
      <nav className={styles.paginationPages}>
        {arr.map((value) => {
          return (
            <Link
              className={
                value === props.pageProp ? styles.pageActive : styles.page
              }
              key={value}
              to={`?page=${value}`}
              onClick={() => props.setPageMethod(value)}
            >
              {value}
            </Link>
          );
        })}
      </nav>
      <div className={styles.paginationQuantities}>
        <button
          className={styles.paginationQuantity}
          onClick={() => dispatch(switchTo5())}
        >
          5
        </button>
        <button
          className={styles.paginationQuantity}
          onClick={() => dispatch(switchTo10())}
        >
          10
        </button>
      </div>
    </div>
  );
}

export default Pagination;
