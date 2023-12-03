import styles from "./Main.module.scss";

import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import FormCard from "../../components/formCard/FormCard";

function Main(): JSX.Element {
  const formDataArr = useAppSelector(
    (state: RootState) => state.formData.formData,
  );

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
      <div className={styles.formsContainer}>
        {formDataArr.length ? (
          formDataArr
            .toReversed()
            .map((formData) => (
              <FormCard key={formData.email} formData={formData} />
            ))
        ) : (
          <h3>Not any forms created</h3>
        )}
      </div>
    </>
  );
}

export default Main;
