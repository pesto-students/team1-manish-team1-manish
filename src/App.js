import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import AuthenticatedHeader from "./components/Header/AuthenticatedHeader";
import ShowCar from "./Pages/ShowCarPage/ShowCar";
import { authorizeUser, setUserDetails } from "./Store/CarStore";
import Profile from "./Pages/Profile/Profile";
import axios from "axios";
import "./styles.css";

const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

const App = () => {
  const isAuthorized = useSelector((state) => state.isAuthUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const autoLogin = async () => {
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
            dispatch(authorizeUser());
            dispatch(setUserDetails(response.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    autoLogin();
  }, []);
  return (
    <div className="App">
      {isAuthorized ? <AuthenticatedHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/buy-car" element={<ShowCar />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
