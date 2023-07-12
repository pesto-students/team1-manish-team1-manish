import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DarkTheme from "../../Themes/ButtonThemes";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import axios from "axios";
import { authorizeUser, setUserDetails } from "../../Store/CarStore";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const Login = () => {
  const isAuthorized = useSelector((state) => state.isAuthUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [missingLoginParams, setMissingLoginParams] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetToast = () => {
    setShowToast({ type: 0, message: '' });
  }
  const idPassLogin = async () => {
    if (!email || !password) {
      setMissingLoginParams(true);
      setTimeout(() => setMissingLoginParams(false), 1000);
      return;
    }
    await axios({
      method: 'post',
      url: process.env.REACT_APP_LOGIN_URL,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL
      },
      data: {
        email: email,
        password: password
      }
    })
      .then((response) => {
        if (response.status == 200) {
          setShowToast({ type: 1, message: 'Authentication Successfull!' })
          setTimeout(() => {
            dispatch(authorizeUser());
            dispatch(setUserDetails(response.data))
            navigate('/')
          }, 3000);
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        console.log(error);
        setShowToast({ type: 2, message: error.response.data.message ? error.response.data.message : 'Something went wrong !' });
      });
  }
  const googleLogin = () => {
    const popup = window.open(process.env.REACT_APP_CALLBACK_URL, "popup", `popup = true,width=400,height=600,left=${screen.width / 2 - 400 / 2 + window.screenX},top=${screen.height / 2 - 600 / 2 + window.screenY}`);
    const checkPopup = setInterval(async () => {
      if (!popup.closed) {
        if (!isLoading) setIsLoading(true);
        return;
      }
      clearInterval(checkPopup);
      await axios({
        method: 'get',
        url: process.env.REACT_APP_GOOGLE_LOGIN_URL,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL
        },
      })
        .then((response) => {
          if (response.status == 200) {
            setShowToast({ type: 1, message: 'Authentication Successfull!' })
            setTimeout(() => {
              dispatch(authorizeUser());
              dispatch(setUserDetails(response.data))
              navigate('/')
            }, 3000);
          }
        })
        // Catching and returning error message if the specified place is invalid.
        .catch((error) => {
          console.log(error);
          setShowToast({ type: 2, message: error.response.data.message ? error.response.data.message : 'Something went wrong !' });
        });
      setIsLoading(false);
    }, 1000);
  }
  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, []);
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
      <div className="login">
        <div className="login-form-container">
          <h1 className="dark-font">Welcome !</h1>
          <p className="darker-font">Signin to stay connected</p>
          <div className="login-input-container">
            <input className={missingLoginParams ? 'wrong-submit' : ''} type="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={missingLoginParams ? 'wrong-submit' : ''} type="password" placeholder=" Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
            <Button onClick={idPassLogin} className="mui-dark-btn" variant="contained">
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
