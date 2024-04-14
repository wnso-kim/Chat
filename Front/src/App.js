import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
import Login from "./pages/Login";

import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}
