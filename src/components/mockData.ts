import { DataPlanet } from "../types/types";

const mockData: Array<DataPlanet> = [
  {
    name: "Bespin",
    rotation_period: "12",
    orbital_period: "5110",
    diameter: "118000",
    climate: "temperate",
    gravity: "1.5 (surface), 1 standard (Cloud City)",
    terrain: "gas giant",
    surface_water: "0",
    population: "6000000",
    residents: ["https://swapi.dev/api/people/26/"],
    films: ["https://swapi.dev/api/films/2/"],
    created: "2014-12-10T11:43:55.240000Z",
    edited: "2014-12-20T20:58:18.427000Z",
    url: "https://swapi.dev/api/planets/6/",
  },
  {
    name: "Endor",
    rotation_period: "18",
    orbital_period: "402",
    diameter: "4900",
    climate: "temperate",
    gravity: "0.85 standard",
    terrain: "forests, mountains, lakes",
    surface_water: "8",
    population: "30000000",
    residents: ["https://swapi.dev/api/people/30/"],
    films: ["https://swapi.dev/api/films/3/"],
    created: "2014-12-10T11:50:29.349000Z",
    edited: "2014-12-20T20:58:18.429000Z",
    url: "https://swapi.dev/api/planets/7/",
  },
];

export default mockData;
