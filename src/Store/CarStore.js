import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { globalInitialState } from "./InitialState";

export const getCarModelsData = createAsyncThunk(
  "carModels/getCarModelsData",
  async () => {
    const url =
      "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=2000";
    const response = await fetch(url);
    const unfilteredData = await response.text();
    const filteredData = unfilteredData.substring(2, unfilteredData.length - 2);
    const data = JSON.parse(filteredData);
    return data.Makes;
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
  },
  extraReducers: {
    [getCarModelsData.pending]: (state, actions) => {
      state.loading = true;
    },
    [getCarModelsData.fulfilled]: (state, actions) => {
      state.carModelsData.loading = false;
      state.carModelsData.carModels = actions.payload;
    },
    [getCarModelsData.rejected]: (state, actions) => {
      state.loading = true;
    },
  },
});

export const {
  togglePage,
  toggleBookmark,
  carBodyData,
  carModelsData,
  carBudgetRange,
} = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
