import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { globalInitialState } from "./InitialState";

export const getCarBrandsData = createAsyncThunk(
  "carBrands/getCarBrandsData",
  async () => {
    const url = "http://localhost:3000/cars-api/make_id";
    const response = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
      },
    });
    const data = await response.json();
    return data;
  }
);

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
    carBodyData: (state) => {
      state.carBodysData;
    },
    carBudgetRange: (state) => {
      state.carBudgetRange;
    },
    authorizeUser: (state) => {
      state.isAuthUser = true;
    },
    unAuthorizeUser: (state) => {
      state.isAuthUser = false;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setCarModelData: (state, action) => {
      state.carModelData.carModel = action.payload;
    },
    setBuyCarDetails: (state, action) => {
      state.buyCarDetails.buyCar = action.payload;
    },
    setCarType: (state, action) => {
      state.carType = action.payload;
    },
  },
  extraReducers: {
    [getCarBrandsData.pending]: (state, actions) => {
      state.carBrandData.loading = true;
    },
    [getCarBrandsData.fulfilled]: (state, actions) => {
      state.carBrandData.loading = false;
      state.carBrandData.carBrand = actions.payload;
    },
    [getCarBrandsData.rejected]: (state, actions) => {
      state.carBrandData.loading = true;
    },
  },
});

export const {
  togglePage,
  toggleBookmark,
  carBodyData,
  carBudgetRange,
  authorizeUser,
  setUserDetails,
  unAuthorizeUser,
  setCarModelData,
  setBuyCarDetails,
  setCarType,
} = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
