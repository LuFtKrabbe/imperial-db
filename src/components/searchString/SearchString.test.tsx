import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../app/store";

import App from "../../App";
import { act } from "react-dom/test-utils";

describe("Search string tests", () => {
  test("Element recieves the value from local storage when mounting", async () => {
    window.localStorage.setItem("lastSearchQuery", "Bespin");

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
          ,
        </Provider>,
      );
    });

    waitFor(
      async () => {
        const searchQueryInput = await screen.findByRole("textbox");
        expect(searchQueryInput).toHaveAttribute("value", "Bespin");
      },
      { timeout: 1000 },
    );
  });

  test("Clicking the search button saves value to the local storage", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
        ,
      </Provider>,
    );

    expect(window.localStorage.getItem("lastSearchQuery")).toBe("Bespin");

    const searchQueryInput = await screen.findByRole("textbox");
    await user.type(searchQueryInput, "Tatooin");
    const searchQueryButton = await screen.findByRole("button", {
      name: /search/i,
    });
    await user.click(searchQueryButton);

    expect(window.localStorage.getItem("lastSearchQuery")).toBe("Tatooin");
  });
});
