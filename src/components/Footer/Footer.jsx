import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <div className="footer-brand">
            <div className="brand-logo-footer">
              <img src="/Assets/Logo.svg" />
            </div>
            <div className="brand-name dark-font">Car Bazaar</div>
          </div>
          <div className="footer-links">
            <button className="dark-font">Home</button>
            <button className="dark-font">Explore</button>
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
