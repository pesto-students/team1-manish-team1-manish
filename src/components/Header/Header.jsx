import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src="/Assets/Logo.svg" />
          </div>
          <div className="brand-name">Car Bazaar</div>
        </div>
        <div className="header-links">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Header;
