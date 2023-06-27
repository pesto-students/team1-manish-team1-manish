import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
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
        <div className="header-links">
          <Link to="/login">
            <button className="header-login-btn">Log In</button>
          </Link>
          <Link to="/register">
            <button className="header-signup-btn">Sign Up</button>
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
            <Link to="/login">
              <p className="hamburger-login-btn" onClick={toggleHeader}>
                Log In
              </p>
            </Link>
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

export default Header;
