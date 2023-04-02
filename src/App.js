import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
