import styles from "./Main.module.scss";

import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import { Link } from "react-router-dom";

function Main(): JSX.Element {
  return (
    <>
      <div className={styles.title}>FORMS</div>
      <div className={styles.formCardPathes}>
        <Link className={styles.formPathCard} to={`/uncontrolled`}>
          <img src={viteLogo} alt="Uncontrolled form" />
          Uncontrolled form
        </Link>
        <Link className={styles.formPathCard} to={`/controlled`}>
          <img src={reactLogo} alt="Controlled form" />
          Controlled form
        </Link>
      </div>
      <div className={styles.formsContainer}>FORMS CONTAINER</div>
    </>
  );
}

export default Main;
