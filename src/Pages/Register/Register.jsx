import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import { setUserDetails } from "../../Store/CarStore";
import DarkTheme from "../../Themes/ButtonThemes";
import {
  emailValidation,
  phoneNoValidation,
  inputValidation,
} from "../../utility/FormValidation";
import "./Register.css";
import "../../styles.css";
import ForgotPasswordOTP from "../ForgotPassword/ForgotPasswordOTP";

const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

const Register = () => {
  const userDetails = useSelector((state) => {
    return state.userData.details;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isIdPassRegisterSuccess, setIsIdPassRegisterSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [tnc, setTnc] = useState(false);
  const [passMissMatch, setPassMissMatch] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validMobNo, setValidMobNo] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };

  const idPassRegister = async () => {
    if (
      firstName.length == 0 &&
      lastName.length == 0 &&
      phoneNo.length == 0 &&
      email.length == 0 &&
      password.length == 0 &&
      cpassword.length == 0
    ) {
      setShowToast({ type: 2, message: "Fill all details !" });
      return;
    }

    const isValidFName = inputValidation(firstName);
    const isValidLName = inputValidation(lastName);

    if (!isValidFName) {
      setValidFirstName(true);
      setTimeout(() => {
        setValidFirstName(false);
      }, 1500);
      setShowToast({ type: 2, message: "Enter a valid Fitst Name !" });
      return;
    }
    if (!isValidLName) {
      setValidLastName(true);
      setTimeout(() => {
        setValidLastName(false);
      }, 1500);
      setShowToast({ type: 2, message: "Enter a valid Last Name !" });
      return;
    }

    const isValidEmail = emailValidation(email);
    const isMobNoValid = phoneNoValidation(phoneNo);
    if (!isValidEmail && !isMobNoValid) {
      setValidEmail(true);
      setValidMobNo(true);
      setTimeout(() => {
        setValidEmail(false);
        setValidMobNo(false);
      }, 2500);
      setShowToast({
        type: 2,
        message: "Enter a valid email and phone number !",
      });
      return;
    }
    if (!isValidEmail) {
      setValidEmail(true);
      setTimeout(() => {
        setValidEmail(false);
      }, 1500);
      setShowToast({ type: 2, message: "Enter a valid email !" });
      return;
    }
    if (!isMobNoValid) {
      setValidMobNo(true);
      setTimeout(() => {
        setValidMobNo(false);
      }, 1500);
      setShowToast({ type: 2, message: "Enter a valid phone number !" });
      return;
    }
    if (
      (password !== cpassword && cpassword.length >= 0) ||
      (password.length == 0 && cpassword.length == 0)
    ) {
      if (!passMissMatch) {
        setPassMissMatch(true);
        setTimeout(() => setPassMissMatch(false), 1500);
      }
      return;
    }
    if (!tnc) {
      setShowToast({ type: 2, message: "Agree with the terms of use !" });
      return;
    }

    setIsLoading(true);
    const emailExist = await IsEmailExist();
    if (emailExist) {
      setShowToast({ type: 2, message: "User exist! Please Login" });
      return;
    }

    await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/verify/otp/send`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/verify/otp/send`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: { name: `${firstName} ${lastName}`, email: email },
    })
      .then((response) => {
        if (response.status == 200) {
          setShowToast({ type: 1, message: "OTP Sent successfully !" });
          setTimeout(() => {
            setIsIdPassRegisterSuccess(true);
            setIsLoading(false);
            setTnc(false);
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

  const userRegisterCallback = async () => {
    if (userDetails.id) return;
    await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/register`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/register`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status == 201) {
          dispatch(setUserDetails(response.data));
          navigate("/");
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data?.message
            ? error.response.data.message
            : "Something went wrong !",
        });
        setIsLoading(false);
      });
  };
  const googleLogin = () => {
    const popup = window.open(
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/google`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/google`,
      "popup",
      `popup = true,width=400,height=600,left=${screen.width / 2 - 400 / 2 + window.screenX
      },top=${screen.height / 2 - 600 / 2 + window.screenY}`
    );
    const checkPopup = setInterval(async () => {
      if (!popup.closed) {
        if (!isLoading) setIsLoading(true);
        return;
      }
      clearInterval(checkPopup);
      await axios({
        method: "get",
        url:
          NODE_ENV === "development"
            ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/register/success`
            : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/register/success`,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      })
        .then((response) => {
          if (response.status == 201) {
            setShowToast({ type: 1, message: "Authentication Successfull!" });
            setTimeout(() => {
              dispatch(setUserDetails(response.data));
              navigate("/");
            }, 3000);
          }
        })
        // Catching and returning error message if the specified place is invalid.
        .catch((error) => {
          setShowToast({
            type: 2,
            message: error.response.data.message
              ? error.response.data.message
              : "Something went wrong !",
          });
        });
      setIsLoading(false);
    }, 1000);
  };

  const IsEmailExist = async () => {
    return await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/verify/email`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/verify/email`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: { email: email },
    }).then((response) => {
      if (response.status == 200) {
        return true;
      } else if (response.status == 202) {
        return false;
      }
      setShowToast({
        type: 2,
        message: "Something went wrong! Please try again",
      });
      return false;
    });
  };

  useEffect(() => {
    if (userDetails.id) {
      navigate("/");
    }
  }, [userDetails]);

  if (isIdPassRegisterSuccess) {
    return (
      <ForgotPasswordOTP
        name={`${firstName} ${lastName}`}
        email={email}
        callbackFunction={userRegisterCallback}
        returnParentPage={setIsIdPassRegisterSuccess}
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
      <div className="register">
        <div className="form-container">
          <h1 className="dark-font">Hello !</h1>
          <p className="darker-font">Signup to create your account !</p>
          <div className="input-container">
            <div className="input-container-1">
              <input
                type="text"
                placeholder=" First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={validFirstName ? "wrong-submit" : ""}
              />
              <input
                type="text"
                placeholder=" Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={validLastName ? "wrong-submit" : ""}
              />
            </div>
            <div className="input-container-2">
              <input
                type="email"
                placeholder=" Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={validEmail ? "wrong-submit" : ""}
              />
              <input
                type="tel"
                placeholder=" Phone No."
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className={validMobNo ? "wrong-submit" : ""}
              />
            </div>
            <div className="input-container-3">
              <input
                type="password"
                placeholder=" Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passMissMatch ? "wrong-submit" : ""}
              />
              <input
                className={
                  password !== cpassword && cpassword.length >= 0
                    ? "wrong-password-border"
                    : ""
                }
                type="password"
                placeholder=" Confirm Password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            {password !== cpassword && cpassword.length >= 0 ? (
              <div
                className={`wrong-password-message ${passMissMatch ? "wrong-submit" : ""
                  }`}
              >
                <span>Passwords does not match</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="tnc-checkbox">
            <input
              value={tnc}
              onClick={() => setTnc((value) => !value)}
              type="checkbox"
            />
            <label>I agree with the terms of use</label>
          </div>
          <ThemeProvider theme={DarkTheme}>
            <Button
              onClick={idPassRegister}
              className="signup-btn"
              variant="contained"
            >
              Sign Up
            </Button>
          </ThemeProvider>
          <p className="dark-font">Sign Up With</p>
          <div className="o2 darkest-font">
            <Icon onClick={googleLogin} icon="iconoir:google" />
          </div>
          <div className="signup-already">
            <p>
              Already have an Account <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
