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

export type LoadData = (
  query: string,
  page: number,
  itemsPerPage: string,
) => void;

export type DataCardProps = {
  key: string;
  itemProp: DataPlanet;
  itemNumProp: number;
  pageProp: number;
};

export type ResultsDisplayProps = {
  planetDataProp: Array<DataPlanet>;
  pageProp: number;
};

export type PaginationProps = {
  setPageMethod: (page: number) => void;
  setItemsPerPageMethod: (itemsPerPage: string) => void;
  itemsPerPageProp: string;
  itemsQuantityProp: number;
};

export type SearchStringProps = {
  setSearchQueryMethod: (searchQuery: string) => void;
  searchQueryProp: string;
};
