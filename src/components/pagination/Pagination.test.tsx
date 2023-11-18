import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../../App";

describe("Pagination tests", () => {
  test("Component updates URL query parameter", async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    const goFirstPage = await screen.findByRole("link", { name: /1/i });
    await user.click(goFirstPage);

    expect(window.location.search).toBe("?page=1");

    const goSecondPage = await screen.findByRole("link", { name: /2/i });
    await user.click(goSecondPage);

    expect(window.location.search).toBe("?page=2");
  });
});
