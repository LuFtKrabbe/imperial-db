import React from "react";
import { Component } from "react";

import styles from "./searchString.module.css";
import { DataSearch } from "../../types/types";

class SearchString extends Component<
  Record<string, (queryString: string) => void>,
  DataSearch
> {
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: Record<string, (queryString: string) => void>) {
    super(props);
    this.state = {
      searchInput: localStorage.getItem("lastQuery")
        ? localStorage.getItem("lastQuery")
        : "",
    };
    this.inputRef = React.createRef<HTMLInputElement>();
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (this.state.searchInput) {
      const { setQueryString } = this.props;
      localStorage.setItem("lastQuery", this.state.searchInput);
      setQueryString(this.state.searchInput);
    }
    console.log(this.state.searchInput);
    event.preventDefault();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchInput: event.target.value,
    });
    console.log(this.state.searchInput);
    event.preventDefault();
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
