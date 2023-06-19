import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <div className="footer-brand">
            <div className="brand-logo-footer">
              <img src="/Assets/Logo.svg" />
            </div>
            <div className="brand-name">Car Bazaar</div>
          </div>
          <div className="footer-links">
            <button className="">Home</button>
            <button className="">Explore</button>
            <button className="">About</button>
            <button className="">Contact</button>
          </div>
        </div>
        <div className="copyright-text">
          © 2023 Car Bazaar – Car Marketplace.
        </div>
      </div>
    </>
  );
};

export default Footer;
