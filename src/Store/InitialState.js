export const globalInitialState = {
  isLoading: false,
  isAuthUser: false,
  isFilterSet: false,
  flag: true,
  bookmarkFlag: false,
  carTypeData: {
    carType: [],
    loading: false,
  },
  carBrandData: {
    carBrand: [],
    loading: false,
  },
  sellCarBrandData: {
    carBrand: [],
    loading: false,
  },
  carOwnershipData: {
    carOwnership: [],
    loading: false,
  },
  carFuelTypeData: {
    carFuelType: [],
    loading: false,
  },
  carModelData: {
    carModel: [],
    loading: false,
  },
  carBudgetRange: [20, 80],
  buyCarDetails: {
    buyCar: [],
    loading: false,
  },
  userDetails: {
    id: "",
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    bookmark_ids: []
  },
};
