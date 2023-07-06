import React, { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toggleBookmark } from "../../Store/CarStore";
import RangeSlider from "../../components/BudgetSlider";
import "./ShowCar.css";

export default function ShowCar() {
  const isBookMarked = useSelector((state) => state.bookmarkFlag);
  const dispatch = useDispatch();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [carModels, setCarModles] = useState(null);
  const carBodys = [
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
  ];

  const bookmarkToggle = () => {
    dispatch(toggleBookmark());
  };

  useEffect(() => {
    const fetchCarsModel = async () => {
      const url = "http://localhost:3000/carapi/models";
      const response = await fetch(url, {
        method: "GET",
      });
      const unfilteredData = await response.text();
      const filteredData = unfilteredData.substring(
        2,
        unfilteredData.length - 2
      );
      const data = JSON.parse(filteredData);
      setCarModles(data.Makes);
      // console.log(carModels);
    };

    fetchCarsModel();
  }, []);

  return (
    <div className="main-car-show">
      <div className={toggleFilter ? "hide-side-bar" : "side-bar"}>
        <div className="car-brand">
          <div className="brand-header">
            <p className="brand-title">Brand</p>
            <button className="minimise-btn">
              <img src="/minusIcon.svg" alt="Minus Icon" />
            </button>
          </div>
          <div className="search-brand">
            <input type="text" placeholder="eg. Astorn Martin" />
            <img src="/searchIcon.svg" alt="Search Brand" />
          </div>
          <div className="brand-filters">
            {!carModels
              ? ""
              : carModels.map((el) => {
                  return (
                    <div className="brand-f1" key={el.make_id}>
                      <p className="b-filter-title">{el.make_display}</p>
                      <input
                        type="checkbox"
                        name="brand-filter-1"
                        id="brand-filter-1"
                      />
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="car-budget">
          <div className="brand-header">
            <p className="brand-title">Budget</p>
            <button className="minimise-btn">
              <img src="/minusIcon.svg" alt="Minus Icon" />
            </button>
          </div>
          <div className="budget-slider">
            <RangeSlider />
          </div>
        </div>
        <div className="car-type">
          <div className="brand-header">
            <p className="brand-title">Type</p>
            <button className="minimise-btn">
              <img src="/minusIcon.svg" alt="Minus Icon" />
            </button>
          </div>
          <div className="search-brand">
            <input type="text" placeholder="eg. SUV, Sedan" />
            <img src="/searchIcon.svg" alt="Search Brand" />
          </div>
          <div className="brand-filters">
            {carBodys.map((el) => {
              return (
                <div className="brand-f1" key={el + Math.random(0, 1)}>
                  <p className="b-filter-title">{el}</p>
                  <input
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
          <p className="no-car-found">102 Cars Found</p>
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
          <div className="show-car-card">
            <div className="car-card-header">
              <div className="car-card-details">
                <p className="car-card-name">Maruti Suzuki Swift</p>
                <p className="car-card-type">Sedan</p>
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
              <p className="car-card-price">RS 10,00,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
