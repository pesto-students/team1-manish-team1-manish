import { createSlice, configureStore } from "@reduxjs/toolkit";
import { globalInitialState } from "./InitialState";

const CarSlice = createSlice({
  name: "CarDetails",
  initialState: globalInitialState,
  reducers: {
    togglePage: (state) => {
      state.flag = !state.flag;
    },
    authorizeUser: (state) => {
      state.isAuthUser = true
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload
    }
  },
});

export const { togglePage, authorizeUser, setUserDetails } = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
