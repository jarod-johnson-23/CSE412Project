import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Album from "./pages/Album";
import Photo from "./pages/Photo";
import Comments from "./pages/Comments";
import Tags from "./pages/Tags";
import { CookiesProvider } from "react-cookie";
import Navbar from "./Navbar";

/* COLOR PALETTE:
light green: #EBF5DF
green: #BAD4AA;
other green: #D4D4AA;
light orange: #EDB458;
dark orange: #E8871E;
*/

//STEPS TO RUN APPLICATION:
//1: Check node and npm are installed with these commands in the terminal: "node -v" and "npm -v"
//2: Type "npm install" in the terminal to install any dependencies listed in package.json
//3: Type "npm start" in the terminal to begin a local server where the website is hosted

//STEPS TO ADD NEW PAGE:
//1: Create new .js file in the page folder.
//2: Create a function in that page named after the file and include a return statement.
//3: After the function write "default export {page name}".
//4: Import the file above.
//5: Create a new route below and choose the URI path.
function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/album/:aid" element={<Album />} />
          <Route path="/photo/:pid" element={<Photo />} />
          <Route path="/comment-search" element={<Comments />} />
          <Route path="/tag-search" element={<Tags />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
