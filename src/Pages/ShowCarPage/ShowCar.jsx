import React, { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import RangeSlider from "../../components/BudgetSlider/BudgetSlider";
import { toggleBookmark, getCarBrandsData, getCarTypeData, getCarOwnershipData, getCarFuelTypeData, brandToggleCheck, ownershipToggleCheck, fuelTypeToggleCheck, typeToggleCheck, searchCarByFilters } from "../../Store/CarStore";
import "./ShowCar.css";
import CarDetails from "../CarDetails/CarDetails";

export default function ShowCar() {
  const dispatch = useDispatch();
  const [isBrandFilterMinimised, setIsBrandFilterMinimised] = useState(false);
  const [isBudgetFilterMinimised, setIsBudgetFilterMinimised] = useState(false);
  const [isTypeFilterMinimised, setIsTypeFilterMinimised] = useState(false);
  const [isFuelTypeFilterMinimised, setIsFuelTypeFilterMinimised] = useState(false);
  const [isOwnershipFilterMinimised, setIsOwnershipFilterMinimised] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const carBrands = useSelector((state) => state.carBrandData.carBrand);
  const carTypes = useSelector((state) => state.carTypeData.carType);
  const carOwnerships = useSelector((state) => state.carOwnershipData.carOwnership);
  const carFuelTypes = useSelector((state) => state.carFuelTypeData.carFuelType);
  const buyCarDetail = useSelector((state) => state.buyCarDetails.buyCar);
  const isBookMarked = useSelector((state) => state.bookmarkFlag);

  const toggleBrandFilter = () => {
    setIsBrandFilterMinimised(value => !value)
  }

  const toggleBudgetFilter = () => {
    setIsBudgetFilterMinimised(value => !value)
  }

  const toggleTypeFilter = () => {
    setIsTypeFilterMinimised(value => !value)
  }

  const toggleFuelTypeFilter = () => {
    setIsFuelTypeFilterMinimised(value => !value)
  }

  const toggleOwnershipTypeFilter = () => {
    setIsOwnershipFilterMinimised(value => !value)
  }

  const bookmarkToggle = () => {
    dispatch(toggleBookmark());
  };
  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  useEffect(() => {
    if (!carBrands.length)
      dispatch(getCarBrandsData());
    if (!carTypes.length)
      dispatch(getCarTypeData());
    if (!carOwnerships.length)
      dispatch(getCarOwnershipData());
    if (!carFuelTypes.length)
      dispatch(getCarFuelTypeData());
    if (carBrands && carTypes && carOwnerships && carFuelTypes && !buyCarDetail.length)
      dispatch(searchCarByFilters())

  }, []);

  if (selectedCar)
    return <CarDetails carId={selectedCar} />
  else
    return (
      <div className="main-car-show">
        <div className={toggleFilter ? "hide-side-bar" : "side-bar"}>
          <div className={`car-brand  ${isBrandFilterMinimised ? 'minimise-filter-container' : ''}`}>
            <div className="brand-header">
              <p className="brand-title">Brand</p>
              <button className="minimise-btn"
                onClick={toggleBrandFilter}
              >
                <img src="/minusIcon.svg" alt="Minus Icon" />
              </button>
            </div>
            <div className={`search-brand ${isBrandFilterMinimised ? 'minimise-filter' : ''}`}>
              <input type="text" placeholder="eg. Astorn Martin" />
              <img src="/searchIcon.svg" alt="Search Brand" />
            </div>
            <div className={`brand-filters  ${isBrandFilterMinimised ? 'minimise-filter' : ''}`}>
              {!carBrands.length
                ? ""
                : carBrands.map((el) => {
                  return (
                    <div
                      className="brand-f1"
                      key={el.brand + Math.random(0, 1)}
                    >
                      <p className="b-filter-title">{el.brand}</p>
                      <input
                        checked={el.checked}
                        onChange={() => {
                          dispatch(brandToggleCheck(el.brand))
                          dispatch(searchCarByFilters())
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
          <div className={`car-budget ${isBudgetFilterMinimised ? 'minimise-filter-container' : ''}`}>
            <div className="brand-header">
              <p className="brand-title">Budget</p>
              <button className="minimise-btn"
                onClick={toggleBudgetFilter}
              >
                <img src="/minusIcon.svg" alt="Minus Icon" />
              </button>
            </div>
            <div className={`budget-slider   ${isBudgetFilterMinimised ? 'minimise-filter' : ''}`}>
              <RangeSlider />
            </div>
          </div>
          <div className={`car-type ${isTypeFilterMinimised ? 'minimise-filter-container' : ''}`}>
            <div className="brand-header">
              <p className="brand-title">Type</p>
              <button className="minimise-btn"
                onClick={toggleTypeFilter}
              >
                <img src="/minusIcon.svg" alt="Minus Icon" />
              </button>
            </div>
            <div className={`search-brand   ${isTypeFilterMinimised ? 'minimise-filter' : ''}`}>
              <input type="text" placeholder="eg. SUV, Sedan" />
              <img src="/searchIcon.svg" alt="Search Brand" />
            </div>
            <div className={`brand-filters   ${isTypeFilterMinimised ? 'minimise-filter' : ''}`}>
              {carTypes.map((el) => {
                return (
                  <div className="brand-f1" key={el.type + Math.random(0, 1)}>
                    <p className="b-filter-title">{el.type}</p>
                    <input
                      checked={el.checked}
                      onChange={() => {
                        dispatch(typeToggleCheck(el.type));
                        dispatch(searchCarByFilters())
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
          <div className={`car-type ${isFuelTypeFilterMinimised ? 'minimise-filter-container' : ''}`}>
            <div className="brand-header">
              <p className="brand-title">Fuel Type</p>
              <button className="minimise-btn"
                onClick={toggleFuelTypeFilter}
              >
                <img src="/minusIcon.svg" alt="Minus Icon" />
              </button>
            </div>
            <div className={`search-brand   ${isFuelTypeFilterMinimised ? 'minimise-filter' : ''}`}>
              <input type="text" placeholder="eg. SUV, Sedan" />
              <img src="/searchIcon.svg" alt="Search Brand" />
            </div>
            <div className={`brand-filters   ${isFuelTypeFilterMinimised ? 'minimise-filter' : ''}`}>
              {carFuelTypes.map((el) => {
                return (
                  <div className="brand-f1" key={el.fueltype + Math.random(0, 1)}>
                    <p className="b-filter-title">{el.fueltype}</p>
                    <input
                      checked={el.checked}
                      onChange={() => {
                        dispatch(fuelTypeToggleCheck(el.fueltype))
                        dispatch(searchCarByFilters())
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
          <div className={`car-type ${isOwnershipFilterMinimised ? 'minimise-filter-container' : ''}`}>
            <div className="brand-header">
              <p className="brand-title">Ownerships</p>
              <button className="minimise-btn"
                onClick={toggleOwnershipTypeFilter}
              >
                <img src="/minusIcon.svg" alt="Minus Icon" />
              </button>
            </div>
            <div className={`search-brand   ${isOwnershipFilterMinimised ? 'minimise-filter' : ''}`}>
              <input type="text" placeholder="eg. SUV, Sedan" />
              <img src="/searchIcon.svg" alt="Search Brand" />
            </div>
            <div className={`brand-filters   ${isOwnershipFilterMinimised ? 'minimise-filter' : ''}`}>
              {carOwnerships.map((el) => {
                return (
                  <div className="brand-f1" key={el.ownership + Math.random(0, 1)}>
                    <p className="b-filter-title">{el.ownership}</p>
                    <input
                      checked={el.checked}
                      onChange={() => {
                        dispatch(ownershipToggleCheck(el.ownership))
                        dispatch(searchCarByFilters())
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
            <div className="search-car">
              <input type="text" placeholder="Search Cars" />
              <img src="/searchIcon.svg" alt="Search Brand" />
            </div>
            <button
              className="filter-btn"
              onClick={() => setToggleFilter((prevState) => !prevState)}
            >
              <FilterAltOutlinedIcon sx={{ color: "#676E8A" }} />
              <p>Filter</p>
            </button>
            <button className="list-filter-btn">
              <p>Sort by: Recommended</p>
              <FilterListOutlinedIcon sx={{ color: "#676E8A" }} />
            </button>
          </div>
          <div className="show-car-header">
            <p className="no-car-found">{buyCarDetail.length} Cars Found</p>
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
            {buyCarDetail.map((el) => {
              return (
                <div className="show-car-card"
                  key={el.id}
                  onClick={() => { setSelectedCar(el.id) }}
                >
                  <div className="car-card-header">
                    <div className="car-card-details">
                      <p className="car-card-name">{el.brand + " " + el.model}</p>
                      <p className="car-card-type">{el.type}</p>
                    </div>
                    <button className="darker-btn" onClick={bookmarkToggle}>
                      {isBookMarked ? (
                        <Icon icon="iconamoon:bookmark-fill" />
                      ) : (
                        <Icon icon="iconamoon:bookmark-bold" />
                      )}
                    </button>
                  </div>
                  <div className="car-card-img">
                    <img src="/Assets/temp-car-img.svg" alt="Car Image" />
                  </div>
                  <div className="car-card-specs">
                    <span>Tags</span>
                    <p className="car-card-price">
                      {formatPrice(parseFloat(el.price))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}
