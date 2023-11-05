import styles from "./pagination.module.css";
import { Link } from "react-router-dom";

function Pagination(props: {
  setPageMethod: (page: number) => void;
  setItemsPerPageMethod: (itemsPerPage: string) => void;
  itemsPerPageProp: string;
  itemsQuantityProp: number;
}): JSX.Element {
  console.log("Pagination is loaded");

  const count =
    props.itemsPerPageProp === "10"
      ? Math.ceil(props.itemsQuantityProp / 10)
      : Math.ceil(props.itemsQuantityProp / 5);
  const arr: number[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }

  return (
    <div className={styles.pagination}>
      <nav className={styles.paginationPages}>
        {arr.map((value, i) => {
          return (
            <Link
              className={styles.paginationPage}
              key={i}
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
