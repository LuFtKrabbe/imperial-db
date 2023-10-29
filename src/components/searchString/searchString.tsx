import React from "react";
import { Component } from "react";

import styles from "./searchString.module.css";
import { DataSearch } from "../../types/types";

class SearchString extends Component<Record<string, never>, DataSearch> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchInput: localStorage.getItem("lastQuery")
        ? localStorage.getItem("lastQuery")
        : "",
    };
    this.inputRef = React.createRef<HTMLInputElement>();
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  handleSubmit = () => {
    if (this.state.searchInput) {
      localStorage.setItem("lastQuery", this.state.searchInput);
    }
  };

  componentDidMount(): void {
    if (this.inputRef.current && this.state.searchInput) {
      this.inputRef.current.value = this.state.searchInput;
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchInput}
              onChange={this.handleChange}
              ref={this.inputRef}
              type="text"
            ></input>
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default SearchString;
