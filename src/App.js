import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Home from "./pages/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Register from "./pages/register/register";
import Login from "./pages/login/login";

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
