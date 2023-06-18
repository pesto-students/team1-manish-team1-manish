import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import CarStore from "./Store/CarStore";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={CarStore}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
