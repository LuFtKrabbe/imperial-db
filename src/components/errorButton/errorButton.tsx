import { useState } from "react";

import styles from "./errorButton.module.css";

function ErrorButton(): JSX.Element {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(
    "GET DATA TO THE OFFICER CODE CYLINDER",
  );

  const throwError = () => {
    setMessage("VERIFYING YOUR IDENTITY...");
    setTimeout(() => {
      setError(true);
    }, 1200);
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
