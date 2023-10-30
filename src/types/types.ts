export type DataQueryResult = {
  currentQuery: string | null;
  resultData: Array<DataPlanet> | string;
};

export type DataPlanet = {
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

/* export type DataPlanetCard = {
  card: DataPlanet; 
  key: number;
}; */

export type DataSearch = {
  searchInput: string | null;
};
