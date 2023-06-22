import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-brand">
          <div className="brand-logo-header">
            <img src="/assets/Logo.svg" />
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
      </div>
    </>
  );
};

export default Header;
