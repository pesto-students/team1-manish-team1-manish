import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { globalInitialState } from "./InitialState";
import axios from "axios";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

export const searchCarByFilters = createAsyncThunk(
  "carDetails/searchCarByFilters",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    const url =
      (NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/search?`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/search?`) +
      new URLSearchParams({
        brands: state.carBrandData.carBrand
          .filter((el) => el.checked === true)
          .map((el) => el.brand),
        minPrice: state.carBudgetRange[0] * 1000,
        maxPrice: state.carBudgetRange[1] * 1000,
        type: state.carTypeData.carType
          .filter((el) => el.checked === true)
          .map((el) => el.type),
        fuelType: state.carFuelTypeData.carFuelType
          .filter((el) => el.checked === true)
          .map((el) => el.fueltype),
        ownership: state.carOwnershipData.carOwnership
          .filter((el) => el.checked === true)
          .map((el) => el.ownership),
      }).toString();
    return axios(url, {
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

export const getUserDetails = createAsyncThunk(
  "userDetails/getUserDetails",
  async () => {
    return axios(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/login/success`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/login/success`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
        withCredentials: true,
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

export const getCarBrandsData = createAsyncThunk(
  "carBrands/getCarBrandsData",
  async () => {
    return axios(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/brands`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/brands`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

export const getSellCarBrandsData = createAsyncThunk(
  "carBrands/getSellCarBrandsData",
  async () => {
    return axios(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars-api/make_id`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars-api/make_id`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

export const getCarTypeData = createAsyncThunk(
  "carTypes/getCarTypesData",
  async () => {
    return axios(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/car-types`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/car-types`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

export const getCarFuelTypeData = createAsyncThunk(
  "carFualTypes/getCarFualTypesData",
  async () => {
    return axios(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/fuel-types`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/fuel-types`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

export const getCarOwnershipData = createAsyncThunk(
  "carOwnership/getCarOwnershipData",
  async () => {
    return axios(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/ownerships`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/ownerships`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
);

const CarSlice = createSlice({
  name: "CarDetails",
  initialState: globalInitialState,
  reducers: {
    setBuyCarFlag: (state) => {
      state.flag = true;
    },
    setSellCarFlag: (state) => {
      state.flag = false;
    },
    unAuthorizeUser: (state) => {
      state.isAuthUser = false;
      state.userDetails = {
        id: "",
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        password: "",
        role_id: "",
        auth_provider: "",
        bookmark_ids: [],
        otp: "",
      };
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
      state.carBrandData.carBrand = state.carBrandData.carBrand.map((el) => {
        if (el.brand === action.payload) {
          return { brand: el.brand, checked: !el.checked };
        } else return el;
      });
    },
    typeToggleCheck: (state, action) => {
      state.carTypeData.carType = state.carTypeData.carType.map((el) => {
        if (el.type === action.payload) {
          return { type: el.type, checked: !el.checked };
        } else return el;
      });
    },
    fuelTypeToggleCheck: (state, action) => {
      state.carFuelTypeData.carFuelType = state.carFuelTypeData.carFuelType.map(
        (el) => {
          if (el.fueltype === action.payload) {
            return { fueltype: el.fueltype, checked: !el.checked };
          } else return el;
        }
      );
    },
    ownershipToggleCheck: (state, action) => {
      state.carOwnershipData.carOwnership =
        state.carOwnershipData.carOwnership.map((el) => {
          if (el.ownership === action.payload) {
            return { ownership: el.ownership, checked: !el.checked };
          } else return el;
        });
    },
    setFilterCarBrand: (state, action) => {
      let updatedFilterCarBrand = state.carBrandData.carBrand;
      updatedFilterCarBrand = updatedFilterCarBrand.map((el) => {
        if (el.brand === action.payload) {
          return { brand: el.brand, checked: true };
        } else {
          return el;
        }
      });
      state.carBrandData.carBrand = updatedFilterCarBrand;
    },
    setFilterCarType: (state, action) => {
      let updatedFilterCarBrand = state.carTypeData.carType;
      updatedFilterCarBrand = updatedFilterCarBrand.map((el) => {
        if (el.type === action.payload) {
          return { type: el.type, checked: true };
        } else return el;
      });
      state.carTypeData.carType = updatedFilterCarBrand;
    },
    setFilterCarBudget: (state, action) => {
      state.carBudgetRange = action.payload;
    },
    setCarBookmark: (state, action) => {
      state.buyCarDetails.buyCar = state.buyCarDetails.buyCar.map((el) => {
        if (el.id === action.payload) {
          return { ...el, bookmarked: true };
        } else return el;
      });

      if (!state.userDetails.bookmark_ids.includes(action.payload)) {
        state.userDetails.bookmark_ids.push(action.payload);
      }
    },
    removeCarBookmark: (state, action) => {
      state.buyCarDetails.buyCar = state.buyCarDetails.buyCar.map((el) => {
        if (el.id === action.payload) {
          return { ...el, bookmarked: false };
        } else return el;
      });

      if (state.userDetails.bookmark_ids.includes(action.payload)) {
        state.userDetails.bookmark_ids = state.userDetails.bookmark_ids.filter(
          (el) => el !== action.payload
        );
      }
    },
    resetShowCarDetails: (state) => {
      state.buyCarDetails.buyCar = [];
    },
    setLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
    setUploadImg: (state, actions) => {
      state.imgToBeUpload.uploadImg = [...actions.payload];
    },
    removeUploadImg: (state, actions) => {
      state.imgToBeUpload.uploadImg.splice(actions.payload, 1);
    },
  },

  extraReducers: {
    [getSellCarBrandsData.pending]: (state, actions) => {
      state.sellCarBrandData.loading = true;
    },
    [getSellCarBrandsData.fulfilled]: (state, actions) => {
      state.sellCarBrandData.loading = false;
      state.sellCarBrandData.carBrand = actions.payload.map((el) => ({
        brand: el.make_id,
        checked: false,
      }));
    },
    [getSellCarBrandsData.rejected]: (state, actions) => {
      state.sellCarBrandData.loading = true;
    },
    [getUserDetails.fulfilled]: (state, actions) => {
      state.isAuthUser = true;
      state.userDetails = actions.payload;
    },
    [getUserDetails.rejected]: (state, actions) => {
      state.isAuthUser = false;
      state.userDetails = {
        id: "",
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_no: null,
        password: "",
        role_id: "",
        auth_provider: "",
        bookmark_ids: [],
        otp: null,
      };
    },
    [getCarBrandsData.pending]: (state, actions) => {
      state.carBrandData.loading = true;
    },
    [getCarBrandsData.fulfilled]: (state, actions) => {
      state.carBrandData.loading = false;
      state.carBrandData.carBrand = actions.payload.map((el) => ({
        brand: el.brand,
        checked: false,
      }));
    },
    [getCarBrandsData.rejected]: (state, actions) => {
      state.carBrandData.loading = true;
    },
    [getCarTypeData.pending]: (state, actions) => {
      state.carTypeData.loading = true;
    },
    [getCarTypeData.fulfilled]: (state, actions) => {
      state.carTypeData.loading = false;
      state.carTypeData.carType = actions.payload.map((el) => ({
        type: el.type,
        checked: false,
      }));
    },
    [getCarTypeData.rejected]: (state, actions) => {
      state.carTypeData.loading = true;
    },
    [getCarOwnershipData.pending]: (state, actions) => {
      state.carOwnershipData.loading = true;
    },
    [getCarOwnershipData.fulfilled]: (state, actions) => {
      state.carOwnershipData.loading = false;
      state.carOwnershipData.carOwnership = actions.payload.map((el) => ({
        ownership: el.ownership,
        checked: false,
      }));
    },
    [getCarOwnershipData.rejected]: (state, actions) => {
      state.carOwnershipData.loading = true;
    },
    [getCarFuelTypeData.pending]: (state, actions) => {
      state.carFuelTypeData.loading = true;
    },
    [getCarFuelTypeData.fulfilled]: (state, actions) => {
      state.carFuelTypeData.loading = false;
      state.carFuelTypeData.carFuelType = actions.payload.map((el) => ({
        fueltype: el.fueltype,
        checked: false,
      }));
    },
    [getCarFuelTypeData.rejected]: (state, actions) => {
      state.carFuelTypeData.loading = true;
    },
    [searchCarByFilters.pending]: (state, actions) => {
      state.buyCarDetails.loading = true;
    },
    [searchCarByFilters.fulfilled]: (state, actions) => {
      state.buyCarDetails.loading = false;
      state.buyCarDetails.buyCar = actions.payload;
    },
    [searchCarByFilters.rejected]: (state, actions) => {
      state.buyCarDetails.loading = true;
    },
  },
});

export const {
  setBuyCarFlag,
  setSellCarFlag,
  carBodyData,
  carBudgetRange,
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
  setCarBookmark,
  removeCarBookmark,
  resetShowCarDetails,
  setLoadingTrue,
  setLoadingFalse,
  setUploadImg,
  removeUploadImg,
} = CarSlice.actions;

const CarStore = configureStore({
  reducer: CarSlice.reducer,
});

export default CarStore;
