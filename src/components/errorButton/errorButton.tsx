import { Component } from "react";

import styles from "./errorButton.module.css";

class ErrorButton extends Component<
  Record<string, never>,
  { error: boolean; message: string }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      error: false,
      message: "GET DATA TO THE OFFICER CODE CYLINDER",
    };
  }

  throwError = () => {
    this.setState({
      message: "VERIFYING YOUR IDENTITY...",
    });
    setTimeout(() => {
      this.setState({
        error: true,
      });
    }, 1200);
  };

  render() {
    if (this.state.error) {
      throw Error("Please, confirm your identity!");
    }
    return (
      <button className={styles.errorButton} onClick={this.throwError}>
        {this.state.message}
      </button>
    );
  }
}

export default ErrorButton;
