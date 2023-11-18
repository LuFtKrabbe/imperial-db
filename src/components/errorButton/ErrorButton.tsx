import { useState } from "react";

import styles from "./ErrorButton.module.css";

function ErrorButton(): JSX.Element {
  const ERROR_APPEARANCE_DELAY = 1200;

  const [error, setError] = useState(false);
  const [message, setMessage] = useState(
    "GET DATA TO THE OFFICER CODE CYLINDER",
  );

  const throwError = () => {
    setMessage("VERIFYING YOUR IDENTITY...");
    setTimeout(() => {
      setError(true);
    }, ERROR_APPEARANCE_DELAY);
  };

  if (error) {
    throw Error("Please, confirm your identity!");
  }

  return (
    <button className={styles.errorButton} onClick={throwError}>
      {message}
    </button>
  );
}

export default ErrorButton;
