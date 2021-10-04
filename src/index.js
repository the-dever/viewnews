import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import HelperContextProvider from "./context/helper-context";
import DataContextProvider from "./context/data-context";
import AuthContextProvider from "./context/auth-context";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <HelperContextProvider>
          <App />
        </HelperContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
