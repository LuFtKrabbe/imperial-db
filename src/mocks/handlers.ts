import { http, HttpResponse, delay } from "msw";
import { mockDataPlanetResponse } from "./mockDataPlanetResponse";
import { mockPlanetBespin } from "./mockPlanetBespin";

export const handlers = [
  http.get("https://swapi.dev/api/planets/", () => {
    return HttpResponse.json(mockDataPlanetResponse);
  }),
  http.get("https://swapi.dev/api/planets/6", async () => {
    await delay(700);
    return HttpResponse.json(mockPlanetBespin);
  }),
];
