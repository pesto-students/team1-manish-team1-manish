import React, { useState } from "react";
import SuccessPage from "./SuccessPage";
import axios from "axios";
import { Alert, Button, CircularProgress, Snackbar, ThemeProvider } from "@mui/material";
import DarkTheme from "../../Themes/ButtonThemes";
import { useNavigate } from "react-router";

const ConfirmPassword = ({ email }) => {
  const [isNewPasswordSet, setIsNewPasswordSet] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState({ type: 0, message: '' });
  const [passMissMatch, setPassMissMatch] = useState(false);
  const navigate = useNavigate();

  const resetToast = () => {
    setShowToast({ type: 0, message: '' });
  }

  const resetPassApiCall = async () => {
    if ((password !== cpassword) && cpassword.length > 0) {
      if (!passMissMatch) {
        setPassMissMatch(true);
        setTimeout(() => setPassMissMatch(false), 2500);
      }
      return;
    }
    setIsLoading(true);
    await axios({
      method: 'post',
      url: process.env.REACT_APP_RESET_PASSWORD_URL,
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
          setIsLoading(false);
          setShowToast({ type: 1, message: 'Password successfully reset !' })
          setTimeout(() => {
            setIsNewPasswordSet(true);
            navigate('/login');
          }, 2500);
          // setIsNewPasswordSet(true);
          // setTimeout(() => setIsNewPasswordSet(false), 2500);

        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setShowToast({ type: 2, message: error.response.data.message });
      });
  }

  return (
    <>
      {isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (<></>)}
      {isNewPasswordSet ? (
        <div className="pass-reset-success">
          <SuccessPage />
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
          <h1 className="forgot__password__header">Reset Password?!</h1>
          <p className="forgot__password__sub-header">Reset your password</p>
          <div className="forgot-reset-password">
            <input
              className="forgot__password__input"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              className={`forgot__password__input--confirm ${(password !== cpassword) && cpassword.length > 0 ? "wrong-password-border" : ""}`}
              type="password"
              placeholder="Confirm New password again"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            ></input>
          </div>
          {(password !== cpassword) && cpassword.length > 0 ? (
            <div className={`wrong-password-message ${passMissMatch ? 'wrong-password-submit' : ''}`}>
              <span>Passwords does not match</span>
            </div>
          ) : (
            <></>
          )}
          <ThemeProvider theme={DarkTheme}>
            <Button onClick={resetPassApiCall} className="mui-dark-btn" variant="contained">
              Confirm
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
