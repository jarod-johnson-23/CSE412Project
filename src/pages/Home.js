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
      <div className="profile-card">
        <h2>{cookies.userInfo.fName + " " + cookies.userInfo.lName}</h2>
        <p>Email: {cookies.userInfo.email}</p>
        <p>Birthday: {cookies.userInfo.dob}</p>
        <p>Hometown: {cookies.userInfo.hometown}</p>
        <p>
          Contribution:{" "}
          <span className="big-number">{cookies.userInfo.contribution}</span>
        </p>
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
      <div className="profile-body">
        <div className="section friends-div">
          <h2>Friend List</h2>
        </div>
        <div className="section suggestion-div">
          <h2>Suggested Friends</h2>
        </div>
        <div className="section albums-div">
          <h2>Owned Photo Albums</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
