import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanetParams, PlanetResponse } from "../types/types";

export const planetApi = createApi({
  reducerPath: "planetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getPlanetById: builder.query<PlanetParams, string>({
      query: (id) => `planets/${id}`,
    }),
    getPlanetList: builder.query<PlanetResponse, string>({
      query: (params) => `planets/${params}`,
    }),
  }),
});

export const { useGetPlanetByIdQuery } = planetApi;
export const { useGetPlanetListQuery } = planetApi;
