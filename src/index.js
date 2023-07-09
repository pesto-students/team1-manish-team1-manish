import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import CarStore from "./Store/CarStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={CarStore}>
    {/* <StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </StrictMode> */}
  </Provider>
);
