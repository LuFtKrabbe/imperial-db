import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LoadingFlagsState = {
  isPlanetListLoading: boolean;
  isPlanetDetailsLoading: boolean;
};

const initialState: LoadingFlagsState = {
  isPlanetListLoading: true,
  isPlanetDetailsLoading: false,
};

export const loadingFlagsSlice = createSlice({
  name: "loadingFlags",
  initialState,
  reducers: {
    setLoadingPlanetList: (state, action: PayloadAction<boolean>) => {
      state.isPlanetListLoading = action.payload;
    },
    setLoadingPlanetDetails: (state, action: PayloadAction<boolean>) => {
      state.isPlanetDetailsLoading = action.payload;
    },
  },
});

export const { setLoadingPlanetList, setLoadingPlanetDetails } =
  loadingFlagsSlice.actions;

export default loadingFlagsSlice.reducer;
