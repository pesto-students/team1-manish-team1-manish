import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div
          onClick={() => {
            setPageNo(0);
          }}
        >
          <p>🕗</p>
        </div>
        <div
          onClick={() => {
            setPageNo(1);
          }}
        >
          <p>⏱️</p>
        </div>
        <div
          onClick={() => {
            setPageNo(2);
          }}
        >
          <p>⏳</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
