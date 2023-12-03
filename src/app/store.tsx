import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import paginationReducer from "../pages/forms/formDataSlice";

export const store = configureStore({
  reducer: {
    formData: paginationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
