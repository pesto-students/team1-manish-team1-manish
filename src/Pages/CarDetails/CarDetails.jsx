/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CarDetails.css";
import { CarDetailsData, CarFeatures, CarSpecifications } from "./DummyCarDetailsData";
import Button from "@mui/material/Button";
import DarkTheme from "../../themes/buttonThemes";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";

const CarDetails = ({ carId }) => {
  const [carData, setCarData] = useState(null);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isImageFading, setIsImageFading] = useState([0, true]);
  const [moreFeatureToggle, setMoreFeatureToggle] = useState(false);
  const [moreSpecificationToggle, setMoreSpecificationToggle] = useState(false);
  let timeOutId = null;
  const bookmarkToggle = () => {
    setIsBookMarked((value) => !value);
  };
  const manualNextImage = () => {
    clearTimeout(timeOutId);
    if (isImageFading[0] >= carData.Images.length - 1) {
      setIsImageFading([0, false]);
    } else {
      setIsImageFading((value) => [value[0] + 1, false]);
    }
  };
  const manualPrevImage = () => {
    clearTimeout(timeOutId);
    if (isImageFading[0] <= 0) {
      setIsImageFading([carData.Images.length - 1, false]);
    } else {
      setIsImageFading((value) => [value[0] - 1, false]);
    }
  };
  useEffect(() => {
    clearTimeout(timeOutId);
    if (!carData) {
      //Backend API call for fetching carDetails
      console.log(carId);
      setTimeout(() => {
        setCarData(CarDetailsData[carId]);
      }, 2000);
    } else {
      timeOutId = setTimeout(() => {
        if (isImageFading[0] >= carData.Images.length - 1) {
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
                <div className="car-description darker-font">
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
                <div className="next-image" onClick={manualNextImage}>
                  <Icon icon="ic:round-greater-than" />
                </div>
                <div className="prev-image" onClick={manualPrevImage}>
                  <Icon icon="ic:round-less-than" />
                </div>
                <img
                  className={isImageFading[1] ? "easeload" : ""}
                  src={carData.Images[isImageFading[0]]}
                />
              </div>
            </>
          )}
        </div>
        {!carData ? (
          <>
            <div className="shimmer-body">
              <h3 className="div-header">Car Overview</h3>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
            </div>
            <div className="shimmer-body">
              <h3 className="div-header">Features</h3>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
            </div>
            <div className="shimmer-body">
              <h3 className="div-header">Specifications</h3>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
            </div>
          </>
        ) : (
          <>
            <div className="info-body">
              <h3 className="div-header">Car Overview</h3>
              <div className="info-content">
                <div className="overview-content">
                  <div className="content-key">Registration Year</div>
                  <div className="content-key">Fuel Type</div>
                  <div className="content-key">Kms Driven</div>
                  <div className="content-key">Ownership</div>
                  <div className="content-key">Transmission</div>
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.RegistrationYear}
                  </div>
                  <div className="content-value">{carData.FualType}</div>
                  <div className="content-value">{carData.KmDriven}</div>
                  <div className="content-value">{carData.Ownership}</div>
                  <div className="content-value">{carData.Transmission}</div>
                </div>
                <div className="overview-content">
                  <div className="content-key">Insaurance</div>
                  <div className="content-key">Variant</div>
                  <div className="content-key">RTO</div>
                  <div className="content-key">Engine</div>
                  <div className="content-key">Year of Manufacture</div>
                </div>
                <div className="overview-content">
                  <div className="content-value">{carData.Insaurance}</div>
                  <div className="content-value">{carData.Variant}</div>
                  <div className="content-value">GJ14</div>
                  <div className="content-value">{carData.Engine}</div>
                  <div className="content-value">{carData.Year}</div>
                </div>
              </div>
            </div>
            <div className="info-body">
              <h3 className="div-header">Features</h3>
              <div className="feature-content">
                {Object.keys(CarFeatures[0]).map((key, index) => {
                  return (index > 0 && index <= 9 ? (
                    <div className="content-key" key={crypto.randomUUID()}>
                      {CarFeatures[0][key] ? <Icon className="tick-icon" icon="charm:tick" /> : <Icon className="cross-icon" icon="charm:cross" />} {key}
                    </div>
                  ) : <></>)
                })}
                {Object.keys(CarFeatures[0]).map((key, index) => {
                  return (index > 9 && moreFeatureToggle ? (
                    <div className="content-key" key={crypto.randomUUID()}>
                      {CarFeatures[0][key] ? <Icon className="tick-icon" icon="charm:tick" /> : <Icon className="cross-icon" icon="charm:cross" />} {key}
                    </div>
                  ) : <></>)
                })}
              </div>
              <h3 onClick={() => { setMoreFeatureToggle(value => !value) }} className="div-header pointer">View all Features <Icon className={moreFeatureToggle ? 'contract' : 'expand'} icon="ic:round-greater-than" /></h3>
            </div>
            <div className="info-body">
              <h3 className="div-header">Specifications</h3>
              <div className="info-content">
                <div className="overview-content">
                  <div className="content-key">Mileage</div>
                  <div className="content-key">Torque</div>
                  <div className="content-key">Brake Type (rear)</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-key">Brake Type (front)</div>
                      <div className="content-key">Body Type</div>
                      <div className="content-key">Max Power (rpm)</div>
                      <div className="content-key">Emission Standard</div>
                    </>
                  ) : (<></>)}
                </div>
                <div className="overview-content">
                  <div className="content-value">{CarSpecifications["Mileage"]}</div>
                  <div className="content-value">{CarSpecifications["Torque"]}</div>
                  <div className="content-value">{CarSpecifications["Brake Type (rear)"]}</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-value">{CarSpecifications["Brake Type (front)"]}</div>
                      <div className="content-value">{CarSpecifications["Body Type"]}</div>
                      <div className="content-value">{CarSpecifications["Max Power (rpm)"]}</div>
                      <div className="content-value">{CarSpecifications["Emission Standard"]}</div>
                    </>
                  ) : (<></>)}
                </div>
                <div className="overview-content">
                  <div className="content-key">Max Power (bhp)</div>
                  <div className="content-key">Engine</div>
                  <div className="content-key">Seats</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-key">Displacement (cc)</div>
                      <div className="content-key">Cylinders</div>
                      <div className="content-key">Fuel Tank Capacity</div>
                      <div className="content-key">Boot Space (Litres)</div>
                    </>
                  ) : (<></>)}
                </div>
                <div className="overview-content">
                  <div className="content-value">{CarSpecifications["Max Power (bhp)"]}</div>
                  <div className="content-value">{CarSpecifications["Engine"]}</div>
                  <div className="content-value">{CarSpecifications["Seats"]}</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-value">{CarSpecifications["Displacement (cc)"]}</div>
                      <div className="content-value">{CarSpecifications["Cylinders"]}</div>
                      <div className="content-value">{CarSpecifications["Fuel Tank Capacity"]}</div>
                      <div className="content-value">{CarSpecifications["Boot Space (Litres)"]}</div>
                    </>
                  ) : (<></>)}
                </div>
              </div>
              <h3 onClick={() => { setMoreSpecificationToggle(value => !value) }} className="div-header pointer">View all Specifications <Icon className={moreSpecificationToggle ? 'contract' : 'expand'} icon="ic:round-greater-than" /></h3>
            </div>
          </>
        )}
      </div>
    </>
  );
};

CarDetails.prototype = {
  carId: PropTypes.number.isRequired,
};

export default CarDetails;
