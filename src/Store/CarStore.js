import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { globalInitialState } from "./InitialState";

export const searchCarByFilters = createAsyncThunk(
  "carDetails/searchCarByFilters",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    const url = "http://localhost:3000/cars/search?" + new URLSearchParams({
      brands: state.carBrandData.carBrand.filter(el => el.checked === true).map(el => el.brand),
      minPrice: state.carBudgetRange[0] * 1000,
      maxPrice: state.carBudgetRange[1] * 1000,
      type: state.carTypeData.carType.filter(el => el.checked === true).map(el => el.type),
      fuelType: state.carFuelTypeData.carFuelType.filter(el => el.checked === true).map(el => el.fueltype),
      ownership: state.carOwnershipData.carOwnership.filter(el => el.checked === true).map(el => el.ownership)
    }).toString();
    return fetch(url, {
      headers: {
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
    })
      .then(async response => {
        return await response.json();
      });
  }
);

export const getCarBrandsData = createAsyncThunk(
  "carBrands/getCarBrandsData",
  async () => {
    const url = "http://localhost:3000/cars/brands";
    return fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
      },
    })
      .then(async response => {
        return await response.json();
      });
  }
);

export const getCarTypeData = createAsyncThunk(
  "carTypes/getCarTypesData",
  async () => {
    const url = "http://localhost:3000/cars/car-types";
    return fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
      },
    })
      .then(async response => {
        return await response.json();
      });
  }
);

export const getCarFuelTypeData = createAsyncThunk(
  "carFualTypes/getCarFualTypesData",
  async () => {
    const url = "http://localhost:3000/cars/fuel-types";
    return fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
      },
    })
      .then(async response => {
        return await response.json();
      });
  }
);

export const getCarOwnershipData = createAsyncThunk(
  "carOwnership/getCarOwnershipData",
  async () => {
    const url = "http://localhost:3000/cars/ownerships";
    return fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
      },
    })
      .then(async response => {
        return await response.json();
      });
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
    brandToggleCheck: (state, action) => {
      state.carBrandData.carBrand = state.carBrandData.carBrand.map(el => {
        if (el.brand === action.payload) {
          return { brand: el.brand, checked: !el.checked };
        }
        else return el;
      })
    },
    typeToggleCheck: (state, action) => {
      state.carTypeData.carType = state.carTypeData.carType.map(el => {
        if (el.type === action.payload) {
          return { type: el.type, checked: !el.checked };
        }
        else return el;
      })
    },
    fuelTypeToggleCheck: (state, action) => {
      state.carFuelTypeData.carFuelType = state.carFuelTypeData.carFuelType.map(el => {
        if (el.fueltype === action.payload) {
          return { fueltype: el.fueltype, checked: !el.checked };
        }
        else return el;
      })
    },
    ownershipToggleCheck: (state, action) => {
      state.carOwnershipData.carOwnership = state.carOwnershipData.carOwnership.map(el => {
        if (el.ownership === action.payload) {
          return { ownership: el.ownership, checked: !el.checked };
        }
        else return el;
      })
    },
    setFilterCarBrand: (state, action) => {
      let updatedFilterCarBrand = state.carBrandData.carBrand;
      updatedFilterCarBrand = updatedFilterCarBrand.map(el => {
        if (el.brand === action.payload) {
          return { brand: el.brand, checked: true };
        }
        else {
          return el;
        }
      })
      state.carBrandData.carBrand = updatedFilterCarBrand;
    },
    setFilterCarType: (state, action) => {
      let updatedFilterCarBrand = state.carTypeData.carType;
      updatedFilterCarBrand = updatedFilterCarBrand.map(el => {
        if (el.type === action.payload) {
          return { type: el.type, checked: true };
        }
        else return el;
      })
      state.carTypeData.carType = updatedFilterCarBrand;
    },
    setFilterCarBudget: (state, action) => {
      state.carBudgetRange = action.payload
    },
    toggleCarBookmark: (state, action) => {
      let updatedCarsData = state.buyCarDetails.buyCar;
      updatedCarsData = updatedCarsData.map(el => {
        if (el.brand === action.payload) {
          return { ...el, bookmarked: !el.bookmarked }
        } else return el;
      })
      state.buyCarDetails.buyCar = updatedCarsData;
    },
    resetShowCarDetails: (state, action) => {
      state.buyCarDetails.buyCar = [];
    }
  },
  extraReducers: {
    [getCarBrandsData.pending]: (state, actions) => {
      state.carBrandData.loading = true;
    },
    [getCarBrandsData.fulfilled]: (state, actions) => {
      state.carBrandData.loading = false;
      state.carBrandData.carBrand = actions.payload.map(el => ({ brand: el.brand, checked: false }));
    },
    [getCarBrandsData.rejected]: (state, actions) => {
      state.carBrandData.loading = true;
    },
    [getCarTypeData.pending]: (state, actions) => {
      state.carTypeData.loading = true;
    },
    [getCarTypeData.fulfilled]: (state, actions) => {
      state.carTypeData.loading = false;
      state.carTypeData.carType = actions.payload.map(el => ({ type: el.type, checked: false }));
    },
    [getCarTypeData.rejected]: (state, actions) => {
      state.carTypeData.loading = true;
    },
    [getCarOwnershipData.pending]: (state, actions) => {
      state.carOwnershipData.loading = true;
    },
    [getCarOwnershipData.fulfilled]: (state, actions) => {
      state.carOwnershipData.loading = false;
      state.carOwnershipData.carOwnership = actions.payload.map(el => ({ ownership: el.ownership, checked: false }));
    },
    [getCarOwnershipData.rejected]: (state, actions) => {
      state.carOwnershipData.loading = true;
    },
    [getCarFuelTypeData.pending]: (state, actions) => {
      state.carFuelTypeData.loading = true;
    },
    [getCarFuelTypeData.fulfilled]: (state, actions) => {
      state.carFuelTypeData.loading = false;
      state.carFuelTypeData.carFuelType = actions.payload.map(el => ({ fueltype: el.fueltype, checked: false }));
    },
    [getCarFuelTypeData.rejected]: (state, actions) => {
      state.carFuelTypeData.loading = true;
    },
    [searchCarByFilters.pending]: (state, actions) => {
      state.buyCarDetails.loading = true;
    },
    [searchCarByFilters.fulfilled]: (state, actions) => {
      state.buyCarDetails.loading = false;
      state.buyCarDetails.buyCar = actions.payload.map(el => {
        if (state.userDetails && state.userDetails.bookmark_ids && state.userDetails.bookmark_ids.includes(el.id)) {
          return { ...el, bookmarked: true };
        }
        else return { ...el, bookmarked: false };
      });
      console.log(state.userDetails);
    },
    [searchCarByFilters.rejected]: (state, actions) => {
      state.buyCarDetails.loading = true;
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
  brandToggleCheck,
  typeToggleCheck,
  fuelTypeToggleCheck,
  ownershipToggleCheck,
  setFilterCarBrand,
  setFilterCarType,
  setFilterCarBudget,
  toggleCarBookmark,
  resetShowCarDetails
} = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
