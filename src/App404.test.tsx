import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";

test("Page 404 is displayed when navigating invalid route", () => {
  const badRoute = "/some/bad/route";

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
      ,
    </Provider>,
  );

  expect(screen.getByText(/404: page not found/i)).toBeInTheDocument();
});
