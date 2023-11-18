import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

import App from "../../App";
import Card from "./Card";
import {
  mockPlanetBespin,
  mockItemNumber,
  mockPage,
} from "../../mocks/mockPlanetBespin";

describe("Card tests", () => {
  test("Card component renders the relevant data", async () => {
    render(
      <Router>
        <Card
          key={mockPlanetBespin.name}
          itemProp={mockPlanetBespin}
          itemNumProp={mockItemNumber}
          pageProp={mockPage}
        />
      </Router>,
    );

    const planetName = await screen.findByText(/bespin/i);
    const gravityInfo = await screen.findByText(
      "Gravity: 1.5 (surface), 1 standard (Cloud City)",
    );
    const populationInfo = await screen.findByText("Population: 6000000");
    const description = await screen.findByText(
      "Description: Planet has the temperate climate and represents gas giant as a surface",
    );

    expect(planetName).toBeInTheDocument();
    expect(gravityInfo).toBeInTheDocument();
    expect(populationInfo).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("Clicking on a card calls the API function", async () => {
    jest.spyOn(global, "fetch");

    render(
      <Router>
        <App />
      </Router>,
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/?page=1",
    );

    const cardBespin = await screen.findByText(/bespin/i);
    await user.click(cardBespin);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/6",
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("Clicking on a card opens a detailed card component", async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    const cardCurtain = await screen.findByRole("detailedCardCurtain");
    const cardPanel = await screen.findByRole("detailedCardPanel");

    expect(cardCurtain).toBeInTheDocument();
    expect(cardPanel).toBeInTheDocument();
  });
});
