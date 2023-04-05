import "./Home.css";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  const navigate = useNavigate();

  function removeUserCookie() {
    const cookiePromise = new Promise((resolve, reject) => {
      navigate("/");
      resolve(removeCookie("userInfo", { path: "/" }));
    });
    return cookiePromise;
  }

  return (
    <div className="home-body">
      <h1>{cookies.userInfo.fName + cookies.userInfo.lName}</h1>
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

export default Home;
