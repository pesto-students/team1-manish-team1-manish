import { createSlice, configureStore } from "@reduxjs/toolkit";
import { globalInitialState } from "./InitialState";

const CarSlice = createSlice({
  name: "CarDetails",
  initialState: globalInitialState,
  reducers: {
    togglePage: (state) => {
      state.flag = !state.flag;
    },
    toggleBookmark: (state) => {
      state.bookmarkFlag = !state.bookmarkFlag;
    },
  },
});

export const { togglePage, toggleBookmark } = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
