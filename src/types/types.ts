export type PlanetResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetParams[];
};

export type PlanetParams = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: Array<string>;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: Array<string>;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

export type PartPlanetListFunc = (
  part: "firstHalf" | "secondHalf",
  data: PlanetParams[],
) => PlanetParams[];

export type CardProps = {
  key: string;
  itemProp: PlanetParams;
  itemNumProp: number;
  pageProp: number;
};

export type PaginationProps = {
  itemsQuantityProp: number;
};

export type ContextProps = {
  planetList: PlanetParams[];
  searchQuery: string;
  setSearchQueryCb: (searchQuery: string) => void;
};
