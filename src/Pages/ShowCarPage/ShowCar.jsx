import React, { useCallback, useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import RangeSlider from "../../components/BudgetSlider/BudgetSlider";
import {
  getCarBrandsData,
  getCarTypeData,
  getCarOwnershipData,
  getCarFuelTypeData,
  brandToggleCheck,
  ownershipToggleCheck,
  fuelTypeToggleCheck,
  typeToggleCheck,
  searchCarByFilters,
  setCarBookmark,
  removeCarBookmark,
  resetFilters,
} from "../../Store/CarStore";
import "./ShowCar.css";
import CarDetails from "../CarDetails/CarDetails";
import { debounce } from "lodash";
import axios from "axios";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

export default function ShowCar() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const isFilterSet = useSelector((state) => state.isFilterSet);
  const [isBrandFilterMinimised, setIsBrandFilterMinimised] = useState(false);
  const [isBudgetFilterMinimised, setIsBudgetFilterMinimised] = useState(false);
  const [isTypeFilterMinimised, setIsTypeFilterMinimised] = useState(false);
  const [isFuelTypeFilterMinimised, setIsFuelTypeFilterMinimised] = useState(false);
  const [isOwnershipFilterMinimised, setIsOwnershipFilterMinimised] = useState(false);
  const [brandSearchBarFilter, setBrandSearchBarFilter] = useState("");
  const [typeSearchBarFilter, setTypeSearchBarFilter] = useState("");
  const [fuelTypeSearchBarFilter, setFuelTypeSearchBarFilter] = useState("");
  const [ownershipSearchBarFilter, setOwnershipSearchBarFilter] = useState("");
  const [showCarDetailSearchBarFilter, setShowCarDetailSearchBarFilter] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showToast, setShowToast] = useState({ type: 0, message: "" });

  const carBrands = useSelector((state) => state.carBrandData.carBrand);
  const carTypes = useSelector((state) => state.carTypeData.carType);
  const carOwnerships = useSelector(
    (state) => state.carOwnershipData.carOwnership
  );
  const carFuelTypes = useSelector(
    (state) => state.carFuelTypeData.carFuelType
  );
  const buyCarDetail = useSelector((state) => state.buyCarDetails);

  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };
  const updateBrandSearchFilter = (event) => {
    setBrandSearchBarFilter(event.target.value);
  };
  const updateTypeSearchFilter = (event) => {
    setTypeSearchBarFilter(event.target.value);
  };
  const updateFuelTypeSearchFilter = (event) => {
    setFuelTypeSearchBarFilter(event.target.value);
  };
  const updateOwnershipSearchFilter = (event) => {
    setOwnershipSearchBarFilter(event.target.value);
  };
  const showCarDetailSearchFilter = (event) => {
    setShowCarDetailSearchBarFilter(event.target.value);
  };

  const debouncedUpdateBrandSearchFilter = useCallback(
    debounce(updateBrandSearchFilter, 500),
    []
  );
  const debouncedUpdateTypeSearchFilter = useCallback(
    debounce(updateTypeSearchFilter, 500),
    []
  );
  const debouncedUpdateFuelTypeSearchFilter = useCallback(
    debounce(updateFuelTypeSearchFilter, 500),
    []
  );
  const debouncedUpdateOwnershipSearchFilter = useCallback(
    debounce(updateOwnershipSearchFilter, 500),
    []
  );
  const debouncedShowCarDetailSearchFilter = useCallback(
    debounce(showCarDetailSearchFilter, 500),
    []
  );

  const toggleBrandFilter = () => {
    setIsBrandFilterMinimised((value) => !value);
  };

  const toggleBudgetFilter = () => {
    setIsBudgetFilterMinimised((value) => !value);
  };

  const toggleTypeFilter = () => {
    setIsTypeFilterMinimised((value) => !value);
  };

  const toggleFuelTypeFilter = () => {
    setIsFuelTypeFilterMinimised((value) => !value);
  };

  const toggleOwnershipTypeFilter = () => {
    setIsOwnershipFilterMinimised((value) => !value);
  };

  const addBookmark = async (id) => {
    if (!userDetails.id) {
      setShowToast({ type: 2, message: "Login to add this car to wishlist !" });
      return;
    }
    await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        bookmarkId: id,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          dispatch(setCarBookmark(id));
          setShowToast({ type: 1, message: "Car added to the wishlist !" });
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data?.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };

  const removeBookmark = async (id) => {
    await axios({
      method: "delete",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        bookmarkId: id,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          dispatch(removeCarBookmark(id));
          setShowToast({ type: 1, message: "Car removed from the wishlist !" });
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data?.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };
  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  useEffect(() => {
    if (!carBrands.length) dispatch(getCarBrandsData());
    if (!carTypes.length) dispatch(getCarTypeData());
    if (!carOwnerships.length) dispatch(getCarOwnershipData());
    if (!carFuelTypes.length) dispatch(getCarFuelTypeData());
    if (carBrands && carTypes && carOwnerships && carFuelTypes)
      dispatch(searchCarByFilters());

    return () => {
      dispatch(resetFilters());
    };
  }, []);

  if (selectedCar)
    return (
      <CarDetails
        carId={selectedCar}
        key={crypto.randomUUID()}
        resetCarId={setSelectedCar}
      />
    );
  else
    return (
      <>
        <Snackbar
          className="toastify-class"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showToast.type == 2}
          autoHideDuration={5000}
          onClose={resetToast}
        >
          <Alert onClose={resetToast} severity="error" sx={{ width: "100%" }}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <Snackbar
          className="toastify-class"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showToast.type == 1}
          autoHideDuration={2500}
          onClose={resetToast}
        >
          <Alert onClose={resetToast} severity="success" sx={{ width: "100%" }}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <div className="main-car-show">
          <div className={toggleFilter ? "hide-side-bar" : "side-bar"}>
            <div
              className={`car-brand  ${isBrandFilterMinimised ? "minimise-filter-container" : ""
                }`}
            >
              <div className="brand-header">
                <p className="brand-title">Brand</p>
                <button className="minimise-btn" onClick={toggleBrandFilter}>
                  {!isBrandFilterMinimised ? (
                    <RemoveIcon fontSize="large" color="disabled" />
                  ) : (
                    <AddIcon fontSize="large" color="disabled" />
                  )}
                </button>
              </div>
              <div
                className={`search-brand ${isBrandFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                <input
                  onChange={debouncedUpdateBrandSearchFilter}
                  type="text"
                  placeholder="eg. Astorn Martin"
                />
              </div>
              <div
                className={`brand-filters  ${isBrandFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                {!carBrands.length
                  ? ""
                  : carBrands.map((el) => {
                    if (brandSearchBarFilter.length) {
                      if (
                        el.brand
                          .toLocaleLowerCase()
                          .includes(brandSearchBarFilter.toLocaleLowerCase())
                      ) {
                        return (
                          <div className="brand-f1" key={crypto.randomUUID()}>
                            <p className="b-filter-title">{el.brand}</p>
                            <input
                              checked={el.checked}
                              onChange={() => {
                                dispatch(brandToggleCheck(el.brand));
                                dispatch(searchCarByFilters());
                              }}
                              type="checkbox"
                              name="brand-filter-1"
                              id="brand-filter-1"
                            />
                          </div>
                        );
                      } else return null;
                    } else
                      return (
                        <div
                          className="brand-f1"
                          key={el.brand + Math.random(0, 1)}
                        >
                          <p className="b-filter-title">{el.brand}</p>
                          <input
                            checked={el.checked}
                            onChange={() => {
                              dispatch(brandToggleCheck(el.brand));
                              dispatch(searchCarByFilters());
                            }}
                            type="checkbox"
                            name="brand-filter-1"
                            id="brand-filter-1"
                          />
                        </div>
                      );
                  })}
              </div>
            </div>
            <div
              className={`car-budget ${isBudgetFilterMinimised ? "minimise-filter-container" : ""
                }`}
            >
              <div className="brand-header">
                <p className="brand-title">Budget</p>
                <button className="minimise-btn" onClick={toggleBudgetFilter}>
                  {!isBudgetFilterMinimised ? (
                    <RemoveIcon fontSize="large" color="disabled" />
                  ) : (
                    <AddIcon fontSize="large" color="disabled" />
                  )}
                </button>
              </div>
              <div
                className={`budget-slider   ${isBudgetFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                <RangeSlider />
              </div>
            </div>
            <div
              className={`car-type ${isTypeFilterMinimised ? "minimise-filter-container" : ""
                }`}
            >
              <div className="brand-header">
                <p className="brand-title">Type</p>
                <button className="minimise-btn" onClick={toggleTypeFilter}>
                  {!isTypeFilterMinimised ? (
                    <RemoveIcon fontSize="large" color="disabled" />
                  ) : (
                    <AddIcon fontSize="large" color="disabled" />
                  )}
                </button>
              </div>
              <div
                className={`search-brand   ${isTypeFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                <input
                  onChange={debouncedUpdateTypeSearchFilter}
                  type="text"
                  placeholder="eg. SUV, Sedan"
                />
              </div>
              <div
                className={`brand-filters   ${isTypeFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                {carTypes.map((el) => {
                  if (typeSearchBarFilter.length) {
                    if (
                      el.type
                        .toLocaleLowerCase()
                        .includes(typeSearchBarFilter.toLocaleLowerCase())
                    ) {
                      return (
                        <div className="brand-f1" key={crypto.randomUUID()}>
                          <p className="b-filter-title">{el.type}</p>
                          <input
                            checked={el.checked}
                            onChange={() => {
                              dispatch(typeToggleCheck(el.type));
                              dispatch(searchCarByFilters());
                            }}
                            type="checkbox"
                            name="brand-filter-1"
                            id="brand-filter-1"
                          />
                        </div>
                      );
                    } else return null;
                  } else
                    return (
                      <div
                        className="brand-f1"
                        key={el.type + Math.random(0, 1)}
                      >
                        <p className="b-filter-title">{el.type}</p>
                        <input
                          checked={el.checked}
                          onChange={() => {
                            dispatch(typeToggleCheck(el.type));
                            dispatch(searchCarByFilters());
                          }}
                          type="checkbox"
                          name="brand-filter-1"
                          id="brand-filter-1"
                        />
                      </div>
                    );
                })}
              </div>
            </div>
            <div
              className={`car-type ${isFuelTypeFilterMinimised ? "minimise-filter-container" : ""
                }`}
            >
              <div className="brand-header">
                <p className="brand-title">Fuel Type</p>
                <button className="minimise-btn" onClick={toggleFuelTypeFilter}>
                  {!isFuelTypeFilterMinimised ? (
                    <RemoveIcon fontSize="large" color="disabled" />
                  ) : (
                    <AddIcon fontSize="large" color="disabled" />
                  )}
                </button>
              </div>
              <div
                className={`search-brand   ${isFuelTypeFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                <input
                  onChange={debouncedUpdateFuelTypeSearchFilter}
                  type="text"
                  placeholder="eg. Petrol, Diesel"
                />
              </div>
              <div
                className={`brand-filters   ${isFuelTypeFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                {carFuelTypes.map((el) => {
                  if (fuelTypeSearchBarFilter.length) {
                    if (
                      el.fueltype
                        .toLocaleLowerCase()
                        .includes(fuelTypeSearchBarFilter.toLocaleLowerCase())
                    ) {
                      return (
                        <div className="brand-f1" key={crypto.randomUUID()}>
                          <p className="b-filter-title">{el.fueltype}</p>
                          <input
                            checked={el.checked}
                            onChange={() => {
                              dispatch(fuelTypeToggleCheck(el.fueltype));
                              dispatch(searchCarByFilters());
                            }}
                            type="checkbox"
                            name="brand-filter-1"
                            id="brand-filter-1"
                          />
                        </div>
                      );
                    } else return null;
                  } else
                    return (
                      <div
                        className="brand-f1"
                        key={el.fueltype + Math.random(0, 1)}
                      >
                        <p className="b-filter-title">{el.fueltype}</p>
                        <input
                          checked={el.checked}
                          onChange={() => {
                            dispatch(fuelTypeToggleCheck(el.fueltype));
                            dispatch(searchCarByFilters());
                          }}
                          type="checkbox"
                          name="brand-filter-1"
                          id="brand-filter-1"
                        />
                      </div>
                    );
                })}
              </div>
            </div>
            <div
              className={`car-type ${isOwnershipFilterMinimised ? "minimise-filter-container" : ""
                }`}
            >
              <div className="brand-header">
                <p className="brand-title">Ownerships</p>
                <button
                  className="minimise-btn"
                  onClick={toggleOwnershipTypeFilter}
                >
                  {!isOwnershipFilterMinimised ? (
                    <RemoveIcon fontSize="large" color="disabled" />
                  ) : (
                    <AddIcon fontSize="large" color="disabled" />
                  )}
                </button>
              </div>
              <div
                className={`search-brand   ${isOwnershipFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                <input
                  onChange={debouncedUpdateOwnershipSearchFilter}
                  type="text"
                  placeholder="eg. 1st Owner, 2st Owner"
                />
              </div>
              <div
                className={`brand-filters   ${isOwnershipFilterMinimised ? "minimise-filter" : ""
                  }`}
              >
                {carOwnerships.map((el) => {
                  if (ownershipSearchBarFilter.length) {
                    if (
                      el.ownership
                        .toLocaleLowerCase()
                        .includes(ownershipSearchBarFilter.toLocaleLowerCase())
                    ) {
                      return (
                        <div className="brand-f1" key={crypto.randomUUID()}>
                          <p className="b-filter-title">{el.ownership}</p>
                          <input
                            checked={el.checked}
                            onChange={() => {
                              dispatch(ownershipToggleCheck(el.ownership));
                              dispatch(searchCarByFilters());
                            }}
                            type="checkbox"
                            name="brand-filter-1"
                            id="brand-filter-1"
                          />
                        </div>
                      );
                    } else return null;
                  } else
                    return (
                      <div
                        className="brand-f1"
                        key={el.ownership + Math.random(0, 1)}
                      >
                        <p className="b-filter-title">{el.ownership}</p>
                        <input
                          checked={el.checked}
                          onChange={() => {
                            dispatch(ownershipToggleCheck(el.ownership));
                            dispatch(searchCarByFilters());
                          }}
                          type="checkbox"
                          name="brand-filter-1"
                          id="brand-filter-1"
                        />
                      </div>
                    );
                })}
              </div>
            </div>
          </div>
          <div className={toggleFilter ? "full-car-page" : "car-show"}>
            <div className="dashboard-bar">
              <div
                className={`search-car ${toggleFilter ? "full-screen-search" : "half-screen-search"
                  }`}
              >
                <input
                  onChange={debouncedShowCarDetailSearchFilter}
                  type="text"
                  placeholder="Search Cars"
                />
              </div>
              <button
                className={!isFilterSet ? 'clear-filter-disabled-btn' : 'clear-filter-btn'}
                onClick={() => {
                  dispatch(resetFilters());
                  dispatch(searchCarByFilters());
                }}
                disabled={!isFilterSet}
              >
                <FilterAltOffOutlinedIcon sx={{ color: "#676E8A" }} />
                <p>Clear</p>
              </button>
              <button
                className="filter-btn"
                onClick={() => setToggleFilter((prevState) => !prevState)}
              >
                <FilterAltOutlinedIcon sx={{ color: "#676E8A" }} />
                <p>Filter</p>
              </button>
            </div>
            <div className="show-car-header">
              <p className="no-car-found">{buyCarDetail.buyCar.length} Cars Found</p>
              <div className="applied-filters">
                <button className="active-filter-btn">
                  <p>Rs. 5,00,000 - 15,00,000</p>
                  <CloseOutlinedIcon sx={{ color: "#676E8A" }} />
                </button>
                <button className="active-filter-btn">
                  <p>Rs. 5,00,000 - 15,00,000</p>
                  <CloseOutlinedIcon sx={{ color: "#676E8A" }} />
                </button>
                <button className="active-filter-btn">
                  <p>Rs. 5,00,000 - 15,00,000</p>
                  <CloseOutlinedIcon sx={{ color: "#676E8A" }} />
                </button>
                <button className="active-filter-btn">
                  <p>Rs. 5,00,000 - 15,00,000</p>
                  <CloseOutlinedIcon sx={{ color: "#676E8A" }} />
                </button>
              </div>
            </div>
            <div className="show-car-ondemand">
              {
                buyCarDetail.loading ? (
                  <div className="buy-car-detail-loader">
                    <CircularProgress />
                  </div>
                ) : (
                  buyCarDetail.buyCar.length ? (
                    buyCarDetail.buyCar.map((el) => {
                      if (showCarDetailSearchBarFilter.length) {
                        if (
                          `${el.brand} ${el.model}`
                            .toLocaleLowerCase()
                            .includes(
                              showCarDetailSearchBarFilter.toLocaleLowerCase()
                            )
                        ) {
                          return (
                            <div className="show-car-card" key={el.id}>
                              <div className="car-card-header">
                                <div className="car-card-details">
                                  <p className="car-card-name">
                                    {el.brand + " " + el.model}
                                  </p>
                                  <p className="car-card-type">{el.type}</p>
                                </div>
                                {userDetails.bookmark_ids.includes(el.id) ? (
                                  <button
                                    className="darker-btn"
                                    onClick={() => removeBookmark(el.id)}
                                  >
                                    <Icon icon="iconamoon:bookmark-fill" />
                                  </button>
                                ) : (
                                  <button
                                    className="darker-btn"
                                    onClick={() => addBookmark(el.id)}
                                  >
                                    <Icon icon="iconamoon:bookmark-bold" />
                                  </button>
                                )}
                              </div>
                              <div
                                className="car-card-img"
                                onClick={() => {
                                  setSelectedCar(el.id);
                                }}
                              >
                                <img
                                  src="/Assets/temp-car-img.svg"
                                  alt="Car Image"
                                />
                              </div>
                              <div className="car-card-specs">
                                <span>
                                  {el?.buyerid === userDetails?.id
                                    ? "BOUGHT"
                                    : el?.buyerid
                                      ? "SOLD OUT"
                                      : "BUY"}
                                </span>
                                <p className="car-card-price">
                                  {formatPrice(parseFloat(el.price))}
                                </p>
                              </div>
                            </div>
                          );
                        } else return null;
                      } else
                        return (
                          <div className="show-car-card" key={el.id}>
                            <div className="car-card-header">
                              <div className="car-card-details">
                                <p className="car-card-name">
                                  {el.brand + " " + el.model}
                                </p>
                                <p className="car-card-type">{el.type}</p>
                              </div>
                              {userDetails?.bookmark_ids?.includes(el.id) ? (
                                <button
                                  className="darker-btn"
                                  onClick={() => removeBookmark(el.id)}
                                >
                                  <Icon icon="iconamoon:bookmark-fill" />
                                </button>
                              ) : (
                                <button
                                  className="darker-btn"
                                  onClick={() => addBookmark(el.id)}
                                >
                                  <Icon icon="iconamoon:bookmark-bold" />
                                </button>
                              )}
                            </div>
                            <div
                              className="car-card-img"
                              onClick={() => {
                                setSelectedCar(el.id);
                              }}
                            >
                              <img src="/Assets/temp-car-img.svg" alt="Car Image" />
                            </div>
                            <div className="car-card-specs">
                              <span>
                                {el?.buyerid === userDetails?.id
                                  ? "BOUGHT"
                                  : el?.buyerid
                                    ? "SOLD OUT"
                                    : "BUY"}
                              </span>
                              <p className="car-card-price">
                                {formatPrice(parseFloat(el.price))}
                              </p>
                            </div>
                          </div>
                        );
                    })
                  ) : (
                    <>
                      <div className="zero-cars-found">
                        <img src="/Assets/no_cars_search.png" />
                      </div>
                    </>
                  )
                )
              }
            </div>
          </div>
        </div>
      </>
    );
}
