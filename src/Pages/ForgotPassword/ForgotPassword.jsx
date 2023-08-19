import React, { useState } from "react";
import ForgotPasswordOTP from "./ForgotPasswordOTP";
import "./ForgotPassword.css";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import DarkTheme from "../../Themes/ButtonThemes";
import axios from "axios";
import ConfirmPassword from "./ResetPassword";
import { emailValidation } from "../../utility/FormValidation";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

const forgotPassword = () => {
  const [IsEmailExist, setIsEmailExist] = useState(false);
  const [missingForgotEmail, setMissingForgotEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: "" });
  const [email, setEmail] = useState("");
  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };
  const forgotContinue = async () => {
    if (!email) {
      setIsEmailExist(false);
      setMissingForgotEmail(true);
      setTimeout(() => setMissingForgotEmail(false), 1000);
      return;
    }
    if (!emailValidation(email)) {
      setShowToast({ type: 2, message: "Email is not valid!" });
      return;
    }
    setIsLoading(true);
    await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/otp/send`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/otp/send`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        email: email,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setShowToast({ type: 1, message: "OTP Sent successfully !" });
          setTimeout(() => {
            setIsEmailExist(true);
            setIsLoading(false);
            resetToast();
          }, 2500);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };
  const callbackComponent = () => {
    return <ConfirmPassword email={email} />;
  };
  if (IsEmailExist) {
    return (
      <ForgotPasswordOTP
        email={email}
        callbackComponent={callbackComponent}
        returnParentPage={setIsEmailExist}
      />
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
      <Snackbar
        className="toastify-class"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast.type == 2}
        autoHideDuration={5000}
        onClose={resetToast}
      >
        <Alert onClose={resetToast} severity="error" sx={{ width: "100%" }}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Snackbar
        className="toastify-class"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast.type == 1}
        autoHideDuration={2500}
        onClose={resetToast}
      >
        <Alert onClose={resetToast} severity="success" sx={{ width: "100%" }}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <div className="forgot__password_container">
        <div className="forgot__password">
          <h1 className="forgot__password__header">Forgot Password?!</h1>
          <p className="forgot__password__sub-header">
            Enter your registered email id to receive OTP
          </p>
          <input
            className={`forgot__password__input ${
              missingForgotEmail ? "wrong-submit" : ""
            }`}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <ThemeProvider theme={DarkTheme}>
            <Button
              onClick={forgotContinue}
              className="mui-dark-btn"
              variant="contained"
            >
              Continue
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default forgotPassword;
