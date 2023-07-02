import React, { useEffect } from "react";
import "./Register.css";
import Button from "@mui/material/Button";
import DarkTheme from "../../Themes/ButtonThemes";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authorizeUser, setUserDetails } from "../../Store/CarStore";

const Register = () => {
  console.log(process.env);
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
        url: process.env.REACT_APP_REGISTER_URL,
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
      <div className="register">
        <div className="form-container">
          <h1 className="dark-font">Hello !</h1>
          <p className="darker-font">Signup to create your account !</p>
          <div className="input-container">
            <div className="input-container-1">
              <input type="text" placeholder=" Full Name" />
              <input type="text" placeholder=" Last Name" />
            </div>
            <div className="input-container-2">
              <input type="email" placeholder=" Email" />
              <input type="tel" placeholder=" Phone No." />
            </div>
            <div className="input-container-3">
              <input type="password" placeholder=" Password" />
              <input type="password" placeholder=" Confirm Password" />
            </div>
          </div>
          <div className="tnc-checkbox">
            <input type="checkbox" />
            <label>I agree with the terms of use</label>
          </div>
          <ThemeProvider theme={DarkTheme}>
            <Button className="signup-btn" variant="contained">
              Sign Up
            </Button>
          </ThemeProvider>
          <p className="dark-font">Sign Up With</p>
          <div className="o2 darkest-font">
            <Icon icon="la:facebook" />
            <Icon icon="uil:instagram" />
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
