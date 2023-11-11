import { DataPlanet, DataPlanetResponse } from "../types/types";

//TODO: Merge these fetch functions

export function fetchPlanetData(query: string): Promise<DataPlanetResponse> {
  return fetch(`https://swapi.dev/api/planets/${query}`).then(
    (response: Response) => response.json(),
  );
}

export function fetchPlanet(query: string): Promise<DataPlanet> {
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
