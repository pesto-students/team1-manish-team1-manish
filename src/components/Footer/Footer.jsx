import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <Link to="/">
            <div className="footer-brand">
              <div className="brand-logo-footer">
                <img src="/Assets/Logo.svg" />
              </div>
              <div className="brand-name dark-font">Car Bazaar</div>
            </div>
          </Link>
          <div className="footer-links">
            <button className="dark-font">
              <Link to="/">Home</Link>
            </button>
            <button className="dark-font">Buy Car</button>
            <button className="dark-font">About</button>
            <button className="dark-font">Contact</button>
          </div>
        </div>
        <div className="copyright-text">
          © 2023 Car Bazaar - Car Marketplace.
        </div>
      </div>
    </>
  );
};

export default Footer;
