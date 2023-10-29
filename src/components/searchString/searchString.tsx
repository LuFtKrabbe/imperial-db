import { Component } from "react";

import styles from "./searchString.module.css";

class SearchString extends Component {
  startSearching() {
    console.log("Searching");
    setTimeout(() => {
      console.log("***DATA***");
    }, 800);
  }

  render() {
    return (
      <>
        <div className={styles.searchContainer}>
          <input className={styles.searchInput}></input>
          <button className={styles.searchButton} onClick={this.startSearching}>
            Search
          </button>
        </div>
      </>
    );
  }
}

export default SearchString;
