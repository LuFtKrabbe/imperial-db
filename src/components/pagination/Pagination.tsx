import styles from "./Pagination.module.css";
import { PaginationProps } from "../../types/types";
import { Link } from "react-router-dom";
import { createArrToNum } from "../../utils/utils";

function Pagination(props: PaginationProps): JSX.Element {
  const pagesQuantity =
    props.itemsPerPageProp === "10"
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
          onClick={() => props.setItemsPerPageMethod("5")}
        >
          5
        </button>
        <button
          className={styles.paginationQuantity}
          onClick={() => props.setItemsPerPageMethod("10")}
        >
          10
        </button>
      </div>
    </div>
  );
}

export default Pagination;
