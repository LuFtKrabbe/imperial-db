import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanetParams, PlanetResponse } from "../types/types";
import { HYDRATE } from "next-redux-wrapper";

export const planetApi = createApi({
  reducerPath: "planetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
export const {
  util: { getRunningQueriesThunk },
} = planetApi;

export const { getPlanetById, getPlanetList } = planetApi.endpoints;
