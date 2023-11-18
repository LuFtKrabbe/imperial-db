import { PlanetParams, PlanetResponse } from "../types/types";

//TODO: Merge these fetch functions

export function fetchPlanetList(query: string): Promise<PlanetResponse> {
  return fetch(`https://swapi.dev/api/planets/${query}`).then(
    (response: Response) => response.json(),
  );
}

export function fetchPlanet(query: string): Promise<PlanetParams> {
  return fetch(`https://swapi.dev/api/planets/${query}`).then(
    (response: Response) => response.json(),
  );
}

export function createArrToNum(number: number) {
  const arr: number[] = [];
  for (let i = 1; i <= number; i++) {
    arr.push(i);
  }
  return arr;
}

export function isOdd(number: number): boolean {
  return number % 2 ? true : false;
}
