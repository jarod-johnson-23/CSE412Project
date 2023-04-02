import "./Home.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./../UserContext";

function Home() {
  const [user, setUser] = useContext(UserContext);

  return <h1>{user.fName + user.lName}</h1>;
}

export default Home;
