import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { CookiesProvider } from "react-cookie";
import Navbar from "./Navbar";

/* COLOR PALETTE:
light green: #EBF5DF
green: #BAD4AA;
other green: #D4D4AA;
light orange: #EDB458;
dark orange: #E8871E;
*/

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
