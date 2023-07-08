import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import AuthenticatedHeader from "./components/Header/AuthenticatedHeader";
import CarDetails from "./Pages/CarDetails/CarDetails";
import ShowCar from "./Pages/ShowCarPage/ShowCar";
import "./styles.css";

const App = () => {
  return (
    <div className="App">
      {/* <AuthenticatedHeader /> */}
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Temp route for testing */}
        <Route path="/cars/details" element={<CarDetails carId={0} />} />
        {/* <Route path="/" element={<ShowCar />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
