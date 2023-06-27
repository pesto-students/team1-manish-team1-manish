import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const AuthenticatedHeader = () => {
  const [toggleHeaderClass, setToggleHeaderClass] = useState("close");
  const toggleHeader = () => {
    if (toggleHeaderClass === "close") {
      setToggleHeaderClass("open");
    } else {
      setToggleHeaderClass("close");
    }
  };
  return (
    <>
      <div className={`header header-${toggleHeaderClass}`}>
        <div className="header-brand">
          <div className="brand-logo-header">
            <img src="/Assets/Logo.svg" />
          </div>
          <div className="brand-name dark-font">Car Bazaar</div>
        </div>
        <div className="auth-header">
          <div className="user-location">
            <div className="location">
              <img src="./locationIcon.svg" alt="User Location" />
            </div>
            <select name="location" id="location-select">
              <option value="">New Delhi</option>
              <option value="dog">Uttar Pradesh</option>
            </select>
          </div>
          <div className="header-search-bar">
            <input type="text" placeholder="Search cars" />
            <div className="search">
              <img src="./searchIcon.svg" alt="Search icon" />
            </div>
          </div>
          <div className="header-action-btn">
            <img src="/messageIcon.svg" alt="Message Icon" />
            <img src="/bellIcon.svg" alt="Bell Icon" />
            <div className="user-profile-icon">
              <select name="user-profile" id="user-profile-select">
                <option value=""></option>
                <option value="profile">
                  <img src="/userIcon.svg" alt="User Icon" />
                </option>
                <option value="log-out">
                  <img src="/userIcon.svg" alt="User Icon" />
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="header-links">
          <Link to="/register">
            <button className="header-signup-btn">Sell Car</button>
          </Link>
        </div>
        <div className="hamburger-container">
          <div
            id="hamburger-icon"
            className={toggleHeaderClass}
            onClick={toggleHeader}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`hamburger-links-${toggleHeaderClass}`}>
            <Link to="/register">
              <p className="hamburger-signup-btn" onClick={toggleHeader}>
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedHeader;
