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
            <div className="dream-car-search"></div>
          </div>
          <div className="landing-page-right-div"></div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
