import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FormDataType = {
  name: string;
  age: string;
  gender: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: File | string;
  termsConditions: string;
};

export type FormDataArrState = {
  formData: FormDataType[];
};

const initialState: FormDataArrState = {
  formData: [],
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataType[]>) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
