import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { countryList } from "./utils/contryList";

export type FormDataType = {
  name: string;
  age: string | number;
  gender: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: FileList | File | string;
  termsConditions: string;
};

export type FormDataState = {
  countryList: string[];
  formData: FormDataType[];
};

const initialState: FormDataState = {
  countryList: countryList,
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
