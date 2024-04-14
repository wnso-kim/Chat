import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import GlobalData, { GlobalDataContext } from "./context/context";

ReactDOM.render(
  <React.StrictMode>
    <GlobalDataContext.Provider value={new GlobalData()}>
      <App />
    </GlobalDataContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
