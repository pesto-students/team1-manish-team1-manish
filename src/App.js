import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  );
};

export default App;
