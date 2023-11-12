import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../../App";

cleanup();

describe("Search string tests", () => {
  test("Clicking the search button saves value to the local storage", async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(window.localStorage.getItem("lastSearchQuery")).toBe(null);

    const searchQueryInput = await screen.findByRole("textbox");
    await user.type(searchQueryInput, "Tatooin");
    const searchQueryButton = await screen.findByRole("button", {
      name: /search/i,
    });
    await user.click(searchQueryButton);

    expect(window.localStorage.getItem("lastSearchQuery")).toBe("Tatooin");
  });

  test("Element recieves the valu from local storage when mounting", async () => {
    window.localStorage.setItem("lastSearchQuery", "Bespin");

    render(
      <Router>
        <App />
      </Router>,
    );

    const searchQueryInput = await screen.findByRole("textbox");
    expect(searchQueryInput).toHaveAttribute("value", "Bespin");
  });
});
