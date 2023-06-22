import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Home from "./pages/home";
import Header from "./components/header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  );
};

export default App;
