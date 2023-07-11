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
    "Up to 5L",
    "5L to 10L",
    "10L to 20L",
    "20L to 50L",
    "Above 50L",
  ],
  userDetails: null,
};
