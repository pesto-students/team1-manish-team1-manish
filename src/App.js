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
import { getUserDetails } from "./Store/CarStore";
import Profile from "./Pages/Profile/Profile";
import "./styles.css";

const App = () => {
  const userDetails = useSelector((state) => {
    return state.userDetails;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(userDetails.id);
    if (!userDetails.id) {
      dispatch(getUserDetails());
    }
  }, [userDetails]);
  return (
    <div className="App">
      {userDetails.id ? <AuthenticatedHeader /> : <Header />}
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
