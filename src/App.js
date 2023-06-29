import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import AuthenticatedHeader from "./components/Header/AuthenticatedHeader";
import CarDetails from "./Pages/CarDetails/CarDetails";

const App = () => {
  return (
    <div className="App">
      {/* <AuthenticatedHeader /> */}
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Temp route for testing */}
        <Route path="/cars/details" element={<CarDetails carId={0} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
