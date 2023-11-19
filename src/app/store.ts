import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import loadingFlagsReducer from "../services/loadingFlagsSlice";
import paginationReducer from "../components/pagination/paginationSlice";
import searchReducer from "../components/searchString/searchSlice";
import { planetApi } from "../services/planet";

export const store = configureStore({
  reducer: {
    loadingFlags: loadingFlagsReducer,
    pagination: paginationReducer,
    search: searchReducer,
    planetApi: planetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
