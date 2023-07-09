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
    unAuthorizeUser: (state) => {
      state.isAuthUser = false
    },
    setUserDetails: (state, action) => {
      console.log(action.payload);
      state.userDetails = action.payload
    }
  },
});

export const { togglePage, authorizeUser, setUserDetails, unAuthorizeUser } = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
