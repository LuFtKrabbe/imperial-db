import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type PaginationState = {
  page: number;
  itemsPerPage: 5 | 10;
  itemsQuantity: number;
};

const initialState: PaginationState = {
  page: 1,
  itemsPerPage: 10,
  itemsQuantity: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<5 | 10>) => {
      state.itemsPerPage = action.payload;
    },
    setItemsQuantity: (state, action: PayloadAction<number>) => {
      state.itemsQuantity = action.payload;
    },
  },
});

export const { setPage, setItemsPerPage, setItemsQuantity } =
  paginationSlice.actions;

export default paginationSlice.reducer;
