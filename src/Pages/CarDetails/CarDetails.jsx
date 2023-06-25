/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CarDetails.css";
import CarDetailsData from "./DummyCarDetailsData";
import Button from "@mui/material/Button";
import DarkTheme from "../../themes/buttonThemes";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";

const CarDetails = ({ carId }) => {
  const [carData, setCarData] = useState(null);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isImageFading, setIsImageFading] = useState([0, true]);
  const bookmarkToggle = () => {
    setIsBookMarked((value) => !value);
  };
  useEffect(() => {
    if (!carData) {
      //Backend API call for fetching carDetails
      console.log(carId);
      setTimeout(() => {
        setCarData(CarDetailsData[carId]);
      }, 2000);
    } else {
      setTimeout(() => {
        if (isImageFading[0] == carData.Images.length - 2) {
          setIsImageFading([0, !isImageFading[1]]);
        } else {
          setIsImageFading((value) => [value[0] + 1, !value[1]]);
        }
      }, 6000);
    }
  }, [carData, isImageFading]);
  return (
    <>
      <div id="style-1" className="car-details">
        <div className="car-preview">
          {!carData ? (
            <>
              <div className="shimmer">
                <div className="shimmering"></div>
                <div className="shimmering"></div>
                <div className="shimmering"></div>
              </div>
              <div className="car-photos shimmering"></div>
            </>
          ) : (
            <>
              <div className="car-info">
                <div className="car-description">
                  <div className="car-name">
                    <p className="">
                      {carData.Year} {carData.Brand} {carData.Model}{" "}
                      {carData.FualCapacity}L {carData.Type} {carData.Variant}{" "}
                      {carData.TransmissionShort}
                    </p>
                  </div>
                  <div className="car-highlights">
                    <ul>
                      <li>{carData.KmDriven}</li>
                      <li>{carData.FualType}</li>
                      <li>{carData.Ownership}</li>
                      <li>Rs. {carData.Price / 100000} Lakh</li>
                    </ul>
                  </div>
                </div>
                <ThemeProvider theme={DarkTheme}>
                  <div className="car-interactive-button">
                    <button className="bookmark" onClick={bookmarkToggle}>
                      {isBookMarked ? (
                        <Icon icon="iconamoon:bookmark-fill" />
                      ) : (
                        <Icon icon="iconamoon:bookmark-bold" />
                      )}
                    </button>
                    <Button
                      className="seller-details-button"
                      variant="contained"
                    >
                      View Seller Details
                    </Button>
                  </div>
                </ThemeProvider>
              </div>
              <div className="car-photos">
                <img
                  className={isImageFading[1] ? "easeload" : ""}
                  src={carData.Images[isImageFading[0]]}
                />
              </div>
            </>
          )}
        </div>
        <div className="car-overview"></div>
        <div className="car-features"></div>
        <div className="car-specifications"></div>
      </div>
    </>
  );
};

CarDetails.prototype = {
  carId: PropTypes.number.isRequired,
};

export default CarDetails;
