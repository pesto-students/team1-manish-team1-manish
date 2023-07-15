import React, { useRef, useState } from "react";
import ConfirmPassword from "./ResetPassword";
import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import DarkTheme from "../../Themes/ButtonThemes";

const ForgotPasswordOTP = ({ email }) => {
  const num1 = useRef();
  const num2 = useRef();
  const num3 = useRef();
  const num4 = useRef();
  const num5 = useRef();
  const num6 = useRef();
  const pattern = /[^0-9]/i;
  const handleOtp1Change = (value) => {
    num1.current.value = value.replace(/[^0-9]/i, "");
    if (pattern.test(value) || !value.length) {
      return;
    }
    num2.current.value = "";
    num2.current.focus();
  };
  const handleOtp2Change = (value) => {
    num2.current.value = value.replace(/[^0-9]/i, "");
    if (pattern.test(value) || !value.length) {
      return;
    }
    num3.current.value = "";
    num3.current.focus();
  };
  const handleOtp3Change = (value) => {
    num3.current.value = value.replace(/[^0-9]/i, "");
    if (pattern.test(value) || !value.length) {
      return;
    }
    num4.current.value = "";
    num4.current.focus();
  };
  const handleOtp4Change = (value) => {
    num4.current.value = value.replace(/[^0-9]/i, "");
    if (pattern.test(value) || !value.length) {
      return;
    }
    num5.current.value = "";
    num5.current.focus();
  };
  const handleOtp5Change = (value) => {
    num5.current.value = value.replace(/[^0-9]/gi, "");
    if (pattern.test(value) || !value.length) {
      return;
    }
    num6.current.value = "";
    num6.current.focus();
  };
  const handleOtp6Change = (value) => {
    num6.current.value = value.replace(/[^0-9]/i, "");
    if (pattern.test(value) || !value.length) {
      setOtp("");
      return;
    }
    setOtp(
      `${num1.current.value}${num2.current.value}${num3.current.value}${num4.current.value}${num5.current.value}${num6.current.value}`
    );
    num6.current.blur();
  };
  const [otp, setOtp] = useState("");
  const [showToast, setShowToast] = useState({ type: 0, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);

  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };

  const sendOtp = async () => {
    setIsLoading(true);
    await axios({
      method: "post",
      url:
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_SEND_OTP_URL
          : process.env.REACT_APP_PROD_SEND_OTP_URL,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
      data: {
        email: email,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setIsLoading(false);
          setShowToast({ type: 1, message: "OTP Sent successfully !" });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setShowToast({ type: 2, message: error.response.data.message });
      });
  };

  const validateOtp = async () => {
    if (otp.length !== 6) {
      setShowToast({ type: 2, message: "Please fill all fields !" });
      return;
    }
    setIsLoading(true);
    await axios({
      method: "post",
      url:
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_VALIDATE_OTP_URL
          : process.env.REACT_APP_PROD_VALIDATE_OTP_URL,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
      data: {
        email: email,
        otp: otp,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setIsLoading(false);
          setShowToast({ type: 1, message: "OTP validation successfull !" });
          setTimeout(() => setIsOtpValid(true), 2500);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setShowToast({ type: 2, message: error.response.data.message });
      });
  };

  if (isOtpValid) {
    return <ConfirmPassword email={email} />;
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
            Enter the OTP sent on your registered email ID
          </p>
          <div className="forgot_password__otp">
            <input
              name="box1"
              className="forgot__password__otp__box"
              type="text"
              maxLength="1"
              size="1"
              max="1"
              onChange={(e) => handleOtp1Change(e.target.value)}
              ref={num1}
            ></input>
            <input
              name="box2"
              className="forgot__password__otp__box"
              type="text"
              maxLength="1"
              size="1"
              max="1"
              onChange={(e) => handleOtp2Change(e.target.value)}
              ref={num2}
            ></input>
            <input
              name="box3"
              className="forgot__password__otp__box"
              type="text"
              maxLength="1"
              size="1"
              max="1"
              onChange={(e) => handleOtp3Change(e.target.value)}
              ref={num3}
            ></input>
            <input
              name="box4"
              className="forgot__password__otp__box"
              type="text"
              maxLength="1"
              size="1"
              max="1"
              onChange={(e) => handleOtp4Change(e.target.value)}
              ref={num4}
            ></input>
            <input
              name="box5"
              className="forgot__password__otp__box"
              type="text"
              maxLength="1"
              size="1"
              max="1"
              onChange={(e) => handleOtp5Change(e.target.value)}
              ref={num5}
            ></input>
            <input
              name="box6"
              className="forgot__password__otp__box"
              type="text"
              maxLength="1"
              size="1"
              max="1"
              onChange={(e) => handleOtp6Change(e.target.value)}
              ref={num6}
            ></input>
          </div>
          <ThemeProvider theme={DarkTheme}>
            <Button
              onClick={validateOtp}
              className="mui-dark-btn"
              variant="contained"
            >
              Submit
            </Button>
          </ThemeProvider>
          <p className="forgot__password__footer">
            Didn&#39;t receive?
            <span onClick={sendOtp}>Resend OTP</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordOTP;
