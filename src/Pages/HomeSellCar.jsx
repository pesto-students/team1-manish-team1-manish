import React from "react";
import "./Home.css";

export function SellCarLandingPage() {
  return (
    <div>
      <div className="sell-car-landing-page-div2">
        <p className="landing-page-heading sell-car-div-heading">
          Sell your car!
        </p>
        <div className="sell-car-details">
          <div className="enter-sell-car-detail">
            <p className="search-your-car sell-car-header">
              Enter Selling Details
            </p>
            <div className="enter-sell-car-drop-down">
              <div className="car-drop-down-1">
                <select name="pets" id="pet-select">
                  <option value="">Select Brand</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Reg. State</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Year & Model</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Ownership</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Fual Type</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Kms Driven</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Variant</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Car Location</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
            </div>
          </div>
          <div className="upload-img-div">Click to upload or drag image </div>
        </div>
        <div className="submit-btn">
          <button className="search-car-btn">Search</button>
        </div>
      </div>
      <div className="landing-page-div3">
        <p className="easy-steps">3 Easy Steps !</p>
        <div className="three-easy-step">
          <div className="variety-of-options">
            <div className="vop-img">
              <img
                src="Assets/variety-of-options.png"
                alt="variety of options"
              />
            </div>
            <div className="vop-details">
              <p className="vop-p1">Register Car Details</p>
              <p className="vop-p2">
                Provide some necessary details related to your vehicle.
              </p>
            </div>
          </div>
          <div className="choose-the-one">
            <div className="cto-img">
              <img src="Assets/car-inspection.png" alt="choose the one" />
            </div>
            <div className="ctop-details">
              <p className="cto-p1">Car Inspection</p>
              <p className="cto-p2">
                Our car expert physically verifies your car’s condition and
                provide the final offer
              </p>
            </div>
          </div>
          <div className="easy-pay">
            <div className="ep-img">
              <img src="Assets/easy-pay.png" alt="easy pay" />
            </div>
            <div className="ep-details">
              <p className="ep-p1">Easy Pay</p>
              <p className="ep-p2">
                Amount will be directly transferred to your bank account before
                your car is picked up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
