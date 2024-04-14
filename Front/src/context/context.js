import React, { useContext } from "react";

class GlobalData {
  socket;
  userName;

  setGlobalData = (socket, userName) => {
    this.socket = socket;
    this.userName = userName;
  };
}

export const GlobalDataContext = React.createContext(new GlobalData());

export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};

export default GlobalData;
