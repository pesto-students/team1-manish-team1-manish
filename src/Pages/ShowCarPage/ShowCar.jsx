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
  const [carsData, setCarsData] = useState(null);

  const bookmarkToggle = () => {
    dispatch(toggleBookmark());
  };

  useEffect(() => {
    const fetchCarsData = async () => {
      const url =
        "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&[params]";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log(data);
      setCarsData(data);

      // const response = await axios.get(url, {
      //   params: {
      //     /* Whatever data you want to send */
      //   },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      console.log(response);
    };

    fetchCarsData();
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
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
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
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
            <div className="brand-f1">
              <p className="b-filter-title">All Brand</p>
              <input
                type="checkbox"
                name="brand-filter-1"
                id="brand-filter-1"
              />
            </div>
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
