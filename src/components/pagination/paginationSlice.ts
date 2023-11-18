import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
  value: string;
};

const initialState: CounterState = {
  value: "10",
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    switchTo5: (state) => {
      state.value = "5";
    },
    switchTo10: (state) => {
      state.value = "10";
    },
  },
});

export const { switchTo5, switchTo10 } = paginationSlice.actions;

export default paginationSlice.reducer;
