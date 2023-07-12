import React, { useState } from "react";
import ForgotPasswordOTP from "./ForgotPasswordOTP";
import "./ForgotPassword.css";
import { Alert, Button, CircularProgress, Snackbar, ThemeProvider } from "@mui/material";
import DarkTheme from "../../Themes/ButtonThemes";
import axios from "axios";

const forgotPassword = () => {
  const [IsEmailExist, setIsEmailExist] = useState(false);
  const [missingForgotEmail, setMissingForgotEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: '' });
  const [email, setEmail] = useState('');
  const resetToast = () => {
    setShowToast({ type: 0, message: '' });
  }
  const forgotContinue = async () => {
    if (!email) {
      setIsEmailExist(false);
      setMissingForgotEmail(true);
      setTimeout(() => setMissingForgotEmail(false), 1000);
      return;
    }
    setIsLoading(true);
    await axios({
      method: 'post',
      url: process.env.REACT_APP_SEND_OTP_URL,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL
      },
      data: {
        email: email
      }
    })
      .then((response) => {
        if (response.status == 200) {
          setIsLoading(false);
          setShowToast({ type: 1, message: 'OTP Sent successfully !' })
          setTimeout(() => setIsEmailExist(true), 2500);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setShowToast({ type: 2, message: error.response.data.message ? error.response.data.message : 'Something went wrong !' });
      });
  }
  if (IsEmailExist) {
    return <ForgotPasswordOTP email={email} />;
  }
  return (
    <>
      {isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (<></>)}
      <Snackbar className="toastify-class" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showToast.type == 2} autoHideDuration={5000} onClose={resetToast}>
        <Alert onClose={resetToast} severity="error" sx={{ width: '100%' }}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Snackbar className="toastify-class" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showToast.type == 1} autoHideDuration={2500} onClose={resetToast}>
        <Alert onClose={resetToast} severity="success" sx={{ width: '100%' }}>
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
            className={`forgot__password__input ${missingForgotEmail ? 'wrong-submit' : ''}`}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <ThemeProvider theme={DarkTheme}>
            <Button onClick={forgotContinue} className="mui-dark-btn" variant="contained">
              Continue
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default forgotPassword;
