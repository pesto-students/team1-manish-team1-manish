import React, { useEffect, useState } from "react";
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
import { getUserDetails } from "./Store/CarStore";
import Profile from "./Pages/Profile/Profile";
import "./styles.css";
import { CircularProgress } from "@mui/material";
import AboutUsPage from "./components/AboutUS/AboutUS";
import ContactUsPage from "./components/ContactUS/ContactUS";

const App = () => {
  const userData = useSelector((state) => {
    return state.userData;
  });
  const isLoading = useSelector((state) => {
    return state.isLoading;
  });
  const [silentLoginCounter, setSilentLoginCounter] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      userData.details.id === "" &&
      !userData.loading &&
      silentLoginCounter < 2
    ) {
      dispatch(getUserDetails());
      setSilentLoginCounter((value) => value + 1);
    } else if (userData.details.id !== "") {
      setSilentLoginCounter(0);
    }
  }, [userData, silentLoginCounter, isLoading]);
  return (
    <div className="App">
      {(userData.details.id === "" || userData.loading) &&
      silentLoginCounter < 2 ? (
        <></>
      ) : (
        <>
          {isLoading ? (
            <div className="circular-loader">
              <CircularProgress />
            </div>
          ) : (
            <></>
          )}
          {userData.details.id ? <AuthenticatedHeader /> : <Header />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/buy-car" element={<ShowCar />} />
            <Route path="/about-page" element={<AboutUsPage />} />
            <Route path="/contact-page" element={<ContactUsPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
