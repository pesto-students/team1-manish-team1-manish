import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DarkTheme from "../../Themes/ButtonThemes";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import axios from "axios";
import { authorizeUser, setUserDetails } from "../../Store/CarStore";

const Login = () => {
  const isAuthorized = useSelector((state) => state.isAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleLogin = () => {
    const popup = window.open(process.env.REACT_APP_CALLBACK_URL, "popup", `popup = true,width=400,height=600,left=${screen.width / 2 - 400 / 2 + window.screenX},top=${screen.height / 2 - 600 / 2 + window.screenY}`);
    const checkPopup = setInterval(async () => {
      if (!popup.closed) return;
      clearInterval(checkPopup);
      await axios({
        method: 'get',
        url: process.env.REACT_APP_LOGIN_URL,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL
        },
      })
        .then((response) => {
          if (response.status == 200) {
            dispatch(authorizeUser());
            dispatch(setUserDetails(response.data))
            navigate('/')
          }
        })
        // Catching and returning error message if the specified place is invalid.
        .catch((error) => {

          console.log(error);
        });
    }, 1000);
  }
  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, []);
  return (
    <>
      <div className="login">
        <div className="login-form-container">
          <h1 className="dark-font">Welcome !</h1>
          <p className="darker-font">Signin to stay connected</p>
          <div className="login-input-container">
            <input type="email" placeholder=" Email" />
            <input type="password" placeholder=" Password" />
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
            <Button className="login-signup-btn" variant="contained">
              Sign In
            </Button>
          </ThemeProvider>
          <p className="dark-font">Sign In With</p>
          <div className="login-o2 darkest-font">
            <Icon icon="la:facebook" />
            <Icon icon="uil:instagram" />
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
