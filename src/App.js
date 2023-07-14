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
import CarDetails from "./Pages/CarDetails/CarDetails";
import ShowCar from "./Pages/ShowCarPage/ShowCar";
import { authorizeUser, setUserDetails } from "./Store/CarStore";
import Profile from "./Pages/Profile/Profile";
import axios from "axios";
import "./styles.css";

const App = () => {
  const isAuthorized = useSelector((state) => state.isAuthUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const autoLogin = async () => {
      await axios({
        method: "get",
        url: process.env.REACT_APP_GOOGLE_LOGIN_URL,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
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
        {/* Temp route for testing */}
        <Route path="/cars/details" element={<CarDetails carId={0} />} />
        <Route path="/buy-car" element={<ShowCar />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
