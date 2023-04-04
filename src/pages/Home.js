import "./Home.css";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

function Home() {
  const [cookies, setCookie] = useCookies(["user"]);

  return <h1>{cookies.user.fName + cookies.user.lName}</h1>;
}

export default Home;
