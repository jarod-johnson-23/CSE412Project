import "./Home.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [db_results, set_db_results] = useState([]);

  let navigate = useNavigate();

  const get_db_results = () => {
    Axios.get("https://cse412project-server.onrender.com/").then((response) => {
      set_db_results(response.data);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1>Homepage</h1>
      <button
        className="default-btn"
        onClick={(e) => {
          get_db_results();
        }}
      >
        Get user data
      </button>
      <div className="db-user-results">
        {db_results.map((val, key) => {
          return (
            <>
              <div className="user-results">
                <h1>{val.UID}</h1>
                <h3>{val.fName}</h3>
                <h3>{val.lName}</h3>
                <h3>{val.dob}</h3>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;
