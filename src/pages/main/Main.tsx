import styles from "./Main.module.scss";

import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";

function Main(): JSX.Element {
  return (
    <>
      <div className={styles.title}>FORMS</div>
      <div className={styles.formCardPathes}>
        <div className={styles.formPathCard}>
          <img src={viteLogo} alt="Uncontrolled form" />
          Uncontrolled form
        </div>
        <div className={styles.formPathCard}>
          <img src={reactLogo} alt="Controlled form" />
          Controlled form
        </div>
      </div>
      <div className={styles.formsContainer}>FORMS CONTAINER</div>
    </>
  );
}

export default Main;
