import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Home from "./Pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
