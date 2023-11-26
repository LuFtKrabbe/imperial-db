import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlanetParams } from "../../types/types";
//import { HYDRATE } from 'next-redux-wrapper';

export type PaginationState = {
  page: number;
  itemsPerPage: 5 | 10;
  itemsQuantity: number;
  itemsList: PlanetParams[];
};

const initialState: PaginationState = {
  page: 1,
  itemsPerPage: 10,
  itemsQuantity: 1,
  itemsList: [],
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
    setItemsList: (state, action: PayloadAction<PlanetParams[]>) => {
      state.itemsList = action.payload;
    },
  },
  /*   extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action);
      return {
        ...state,
        ...action.payload.pagination,
      }
    } 
  } */
});

export const { setPage, setItemsPerPage, setItemsQuantity, setItemsList } =
  paginationSlice.actions;

export default paginationSlice.reducer;
