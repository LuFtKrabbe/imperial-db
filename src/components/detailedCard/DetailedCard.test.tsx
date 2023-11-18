import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../../App";

describe("DetailedCard tests", () => {
  test("Loading indicator is displayed while data fetching", async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    const cardBespin = await screen.findByText(/bespin/i);
    await user.click(cardBespin);

    const loader = await screen.findByText(/loading/i);
    expect(loader).toBeInTheDocument();
  });

  test("Detailed card correctly displays its data", async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    const cardBespinPeriodRot = await screen.findByText(/rotation period: 12/i);
    const cardBespinPeriodOrb =
      await screen.findByText(/orbital period: 5110/i);
    const cardBespinClimate = await screen.findByText(/diameter: 118000/i);
    const cardBespinTerrain = await screen.findByText(/terrain: gas giant/i);
    const cardBespinSurface = await screen.findByText(/surface water: 0/i);
    const cardCloseButton = await screen.findByRole("button", {
      name: /close/i,
    });

    expect(cardBespinPeriodRot).toBeInTheDocument();
    expect(cardBespinPeriodOrb).toBeInTheDocument();
    expect(cardBespinClimate).toBeInTheDocument();
    expect(cardBespinTerrain).toBeInTheDocument();
    expect(cardBespinSurface).toBeInTheDocument();
    expect(cardCloseButton).toBeInTheDocument();
  });

  test("Clicking on a close button hides the element", async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    const cardCurtain = await screen.findByRole("detailedCardCurtain");
    const cardPanel = await screen.findByRole("detailedCardPanel");
    const cardCloseButton = await screen.findByRole("button", {
      name: /close/i,
    });

    expect(cardCurtain).toBeInTheDocument();
    expect(cardPanel).toBeInTheDocument();

    await user.click(cardCloseButton);

    expect(cardCurtain).not.toBeInTheDocument();
    expect(cardPanel).not.toBeInTheDocument();
  });
});
