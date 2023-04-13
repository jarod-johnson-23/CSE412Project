import "./Navbar.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const [button, setButton] = useState("");

  //Function to remove the userInfo cookie so the user can log out. The promise ensures that the cookie is removed before the page changes
  function removeUserCookie() {
    const cookiePromise = new Promise((resolve, reject) => {
      navigate("/");
      resolve(removeCookie("userInfo", { path: "/" }));
    });
    return cookiePromise;
  }

  //This is the HTML that is displayed in the navbar across all pages
  return (
    <div className="navbar-body">
      <h1>Facebook, but better</h1>
      <button
        className="default-btn"
        onClick={(e) => {
          removeUserCookie().then((response) => {
            console.log("LOGGED OUT USER");
          });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Navbar;
