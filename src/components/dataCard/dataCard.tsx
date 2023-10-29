import { Component } from "react";

import styles from "./dataCard.module.css";

class DataCard extends Component<{ card: string; key: number }> {
  constructor(props: { card: string; key: number }) {
    super(props);
  }

  render() {
    const name = this.props.card;
    return <div className={styles.card}>I am planet {name};</div>;
  }
}

export default DataCard;
