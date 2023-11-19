import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../app/store";

import App from "../../App";

describe("Error button tests", () => {
  const MORE_THAN_ERROR_APPEARANCE_DELAY = 1500;

  test("Fallback UI renders when error occurs", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const errorButton = screen.getByRole("button", {
      name: /get data to the officer code cylinder/i,
    });
    await user.click(errorButton);

    const errorButtonText = screen.getByRole("button", {
      name: /verifying your identity/i,
    });
    expect(errorButtonText).toBeInTheDocument();

    waitFor(
      async () => {
        const errorMessage = await screen.findByRole("heading", {
          name: /wrong access!/i,
        });
        expect(errorMessage).toBeInTheDocument();
      },
      { timeout: MORE_THAN_ERROR_APPEARANCE_DELAY },
    );
  });
});
