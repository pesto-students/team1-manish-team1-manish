import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import DarkTheme from "../../themes/buttonThemes";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Login = () => {
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
              <Link to="/forgot1">Forgot Password?</Link>
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
            <Icon icon="iconoir:google" />
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
