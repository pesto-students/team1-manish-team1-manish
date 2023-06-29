import React from "react";
import "./styles.css";

const SuccessPage = () => {
  return (
    <>
      <div className="forgot__password">
        <div className="forgot_password__close">X</div>
        <h1 className="forgot__password__header">Password Updated</h1>
        <img
          src="/Assets/pw_successful.png"
          alt="Password reset successful"
          className="forgot__password__image"
        />
        <p className="forgot__password__sub-header">
          Your password has been updated successfully!
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
