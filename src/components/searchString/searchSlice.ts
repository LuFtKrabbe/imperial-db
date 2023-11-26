import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type SearchState = {
  searchQuery: string;
};

const initialState: SearchState = {
  searchQuery: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.pagination,
      };
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
