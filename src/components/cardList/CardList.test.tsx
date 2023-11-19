import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../app/store";

import CardList from "./CardList";
import App from "../../App";

describe("Card list tests", () => {
  test("Component renders the specified number of cards", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const cardListInit = await screen.findByRole("cardList");
    expect(cardListInit.children).toHaveLength(10);

    const switchToFiveItemsPerPage = await screen.findByRole("button", {
      name: /5/i,
    });
    await user.click(switchToFiveItemsPerPage);

    const cardListAfterSwitch = await screen.findByRole("cardList");
    expect(cardListAfterSwitch.children).toHaveLength(5);
  });

  test("Message for nothing rendered data", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CardList />
        </Router>
        ,
      </Provider>,
    );

    const cardList = await screen.findByRole("cardList");
    expect(cardList.children).toHaveLength(1);

    const message = screen.getByRole("heading", {
      name: /nothing data has been found/i,
    });
    expect(message).toBeInTheDocument();
  });
});
