import React from "react";
import "./register.css";
import Button from "@mui/material/Button";
import DarkTheme from "../../themes/buttonThemes";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="register">
        <div className="form-container">
          <h1 className="dark-font">Hello !</h1>
          <p className="darker-font">Signup to create your account !</p>
          <div className="input-container">
            <div className="left-container">
              <input type="text" placeholder=" Full Name" />
              <input type="email" placeholder=" Email" />
              <input type="password" placeholder=" Password" />
            </div>
            <div className="right-container">
              <input type="text" placeholder=" Last Name" />
              <input type="tel" placeholder=" Phone No." />
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
            <Icon icon="iconoir:google" />
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
