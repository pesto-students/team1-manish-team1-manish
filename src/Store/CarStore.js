import { createSlice, configureStore } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const CarSlice = createSlice({
  name: "CarDetails",
  initialState: initialState,
  reducers: {},
});

export const {} = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
