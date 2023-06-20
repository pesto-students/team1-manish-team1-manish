import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <div className="landing-page-div1">
          <img
            src="/Assets/landing-first-img.svg"
            alt="Landing page first image"
            className="landing-page-img"
          />
          <div className="text-inside-img">
            <p className="img-text">Car to cash in a few hours!</p>
            <button className="img-btn">Sell Car</button>
          </div>
        </div>
        <div className="landing-page-div2">
          <div className="landing-page-left-div">
            <p className="landing-page-heading">Looking For a Car ?</p>
            <div className="dream-car-search">
              <p className="search-your-car">Search you dream car !</p>
              <div className="search-car-drop-down">
                <select name="pets" id="pet-select">
                  <option value="">Select Budget</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Brand</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Vehicle</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <button className="search-car-btn">Search</button>
            </div>
          </div>
          <div className="landing-page-right-div">
            <img
              src="/Assets/looking-for-car-img.png"
              alt="Looking for Car Image"
            />
          </div>
        </div>
        <div className="landing-page-div3">
          <p className="easy-steps">3 Easy Steps !</p>
          <div className="three-easy-step">
            <div className="variety-of-options"></div>
            <div className="choose-the-one"></div>
            <div className="easy-pay"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
