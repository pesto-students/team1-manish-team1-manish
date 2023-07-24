export const globalInitialState = {
  isAuthUser: false,
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
    id: null,
    name: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_no: null,
    password: null,
    role_id: null,
    auth_provider: null,
    bookmark_ids: [],
    otp: null
  },
};
