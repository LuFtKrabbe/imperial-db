import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import paginationReducer from "../components/pagination/paginationSlice";
import searchReducer from "../components/searchString/searchSlice";
import { planetApi } from "../services/planetApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      pagination: paginationReducer,
      search: searchReducer,
      planetApi: planetApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
