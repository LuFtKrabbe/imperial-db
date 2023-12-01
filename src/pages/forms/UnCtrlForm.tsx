import styles from "./Forms.module.scss";

import { Link } from "react-router-dom";

function UnCtrlForm(): JSX.Element {
  return (
    <>
      <div className={styles.title}>UNCONTROLLED FORM</div>
      <Link className={styles.backButton} to={"/main"}>
        ← BACK
      </Link>
      <form>
        <div className={styles.fieldsContainer}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input type="text" id="username" name="username"></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input type="text" id="age" name="age"></input>
          </div>
          <div className={styles.field}>
            <label>Gender</label>
            <div className={styles.genderContainer}>
              <input
                type="radio"
                id="male"
                name="gender"
                className={styles.radio}
              ></input>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                className={styles.radio}
              ></input>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="country">Country</label>
            <input type="input" id="country" name="country"></input>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email"></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password"></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="text"
              id="confirm-password"
              name="confirm-password"
            ></input>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.field}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
            ></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="terms-conditions">Terms & Сonditions</label>
            <input
              type="checkbox"
              id="terms-conditions"
              name="terms-conditions"
              className={styles.terms}
            ></input>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default UnCtrlForm;
