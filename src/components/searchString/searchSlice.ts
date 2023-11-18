import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
  searchQuery: string;
};

const initialState: SearchState = {
  searchQuery: localStorage.getItem("lastSearchQuery") || "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      localStorage.setItem("lastSearchQuery", action.payload);
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
