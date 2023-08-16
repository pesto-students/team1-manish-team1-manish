import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DarkTheme from "../../Themes/ButtonThemes";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import axios from "axios";
import { setUserDetails } from "../../Store/CarStore";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

const Login = () => {
  const userDetails = useSelector((state) => {
    return state.userData.details;
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [missingLoginParams, setMissingLoginParams] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };
  const idPassLogin = async () => {
    if (!email || !password) {
      setMissingLoginParams(true);
      setTimeout(() => setMissingLoginParams(false), 1000);
      return;
    }
    setIsLoading(true);
    await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/login`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/login`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setShowToast({ type: 1, message: "Authentication Successfull!" });
          setTimeout(() => {
            dispatch(setUserDetails(response.data));
            navigate("/");
            setIsLoading(false);
          }, 3000);
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response?.data?.message
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
            ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/login/success`
            : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/login/success`,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin":
            NODE_ENV === "development"
              ? REACT_APP_DEV_CORS_URL
              : REACT_APP_PROD_CORS_URL,
        },
      })
        .then((response) => {
          if (response.status == 200) {
            setShowToast({ type: 1, message: "Authentication Successfull!" });
            setTimeout(() => {
              dispatch(setUserDetails(response.data));
              navigate("/");
            }, 1000);
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
        })
        .finally(() => setIsLoading(false));
    }, 1000);
  };
  useEffect(() => {
    if (userDetails.id) {
      navigate("/");
    }
  }, [userDetails]);
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
      <div className="login">
        <div className="login-form-container">
          <h1 className="dark-font">Welcome !</h1>
          <p className="darker-font">Signin to stay connected</p>
          <div className="login-input-container">
            <input
              className={missingLoginParams ? "wrong-submit" : ""}
              type="email"
              placeholder=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={missingLoginParams ? "wrong-submit" : ""}
              type="password"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-remember-forget">
            <div className="login-remember-me">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <div className="login-forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          <ThemeProvider theme={DarkTheme}>
            <Button
              onClick={idPassLogin}
              className="mui-dark-btn"
              variant="contained"
            >
              Sign In
            </Button>
          </ThemeProvider>
          <p className="dark-font">Sign In With</p>
          <div className="login-o2 darkest-font">
            <Icon onClick={googleLogin} icon="iconoir:google" />
          </div>
          <div className="signup-already">
            <p>
              Don’t have an Account <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
