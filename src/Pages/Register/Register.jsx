import React, { useEffect, useState } from "react";
import "./Register.css";
import Button from "@mui/material/Button";
import DarkTheme from "../../Themes/ButtonThemes";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authorizeUser, setUserDetails } from "../../Store/CarStore";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const Register = () => {
  const isAuthorized = useSelector((state) => state.isAuthUser);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [passMissMatch, setPassMissMatch] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetToast = () => {
    setShowToast({ type: 0, message: '' });
  }
  const idPassRegister = async () => {
    if ((password !== cpassword) && cpassword.length > 0) {
      if (!passMissMatch) {
        setPassMissMatch(true);
        setTimeout(() => setPassMissMatch(false), 2500);
      }
      return;
    }
    await axios({
      method: 'post',
      url: process.env.REACT_APP_REGISTER_URL,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL
      },
      data: {
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        email: email,
        password: password
      }
    })
      .then((response) => {
        if (response.status == 201) {
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
        setShowToast({ type: 2, message: error.response.data.message });
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
        url: process.env.REACT_APP_GOOGLE_REGISTER_URL,
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
          setShowToast({ type: 2, message: error.response.data.message });
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
      <div className="register">
        <div className="form-container">
          <h1 className="dark-font">Hello !</h1>
          <p className="darker-font">Signup to create your account !</p>
          <div className="input-container">
            <div className="input-container-1">
              <input type="text" placeholder=" First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder=" Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="input-container-2">
              <input type="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="tel" placeholder=" Phone No." value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            </div>
            <div className="input-container-3">
              <input type="password" placeholder=" Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input className={(password !== cpassword) && cpassword.length > 0 ? "wrong-password-border" : ""} type="password" placeholder=" Confirm Password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
            </div>
            {(password !== cpassword) && cpassword.length > 0 ? (
              <div className={`wrong-password-message ${passMissMatch ? 'wrong-submit' : ''}`}>
                <span>Passwords does not match</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="tnc-checkbox">
            <input type="checkbox" />
            <label>I agree with the terms of use</label>
          </div>
          <ThemeProvider theme={DarkTheme}>
            <Button onClick={idPassRegister} className="signup-btn" variant="contained">
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
