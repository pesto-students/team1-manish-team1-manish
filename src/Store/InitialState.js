export const globalInitialState = {
  isAuthUser: false,
  flag: true,
  bookmarkFlag: false,
  carBodysData: [
    "Sedan/Compact Sedan",
    "SUV/Compact SUV (Sports Utility Vehicle)",
    "Hatchback",
    "Crossovers",
    "MPV (Multi-Purpose Vehicle)",
    "Station Wagon/ Estate Cars",
    "Coupe",
    "Convertibles/ Cabriolet/ Spyder",
    "Microcars",
    "Limousines",
    "Pick-up trucks",
  ],
  carBrandData: {
    carBrand: [],
    loading: false,
  },
  carModelData: {
    carModel: [],
    loading: false,
  },
  carBudgetRange: [
    { displayPrice: "Up to 5L", value: [0, 500000] },
    { displayPrice: "5L to 10L", value: [500001, 1000000] },
    { displayPrice: "10L to 20L", value: [1000001, 2000000] },
    { displayPrice: "20L to 50L", value: [2000001, 5000000] },
    { displayPrice: "Above 50L", value: [5000000, 10000000] },
  ],
  buyCarDetails: {
    buyCar: [],
    loading: false,
  },
  userDetails: null,
};
