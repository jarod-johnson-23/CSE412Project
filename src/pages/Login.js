import "./Login.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  let navigate = useNavigate();

  const login_check = () => {
    const hashPass = password;
    Axios.post("https://cse412project-server.onrender.com/login-user", {
      email: email,
      hashPass: hashPass,
    }).then((response) => {
      if (response.data.length === 0) {
        console.log("No Account Found");
      } else {
        setCookie("user", JSON.stringify(response.data[0]), { path: "/" });
        navigate("/home");
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login-body">
      <h1>Login</h1>
      <input
        type="text"
        className="text-input"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          set_email(e.target.value);
        }}
      />
      <input
        type="text"
        className="text-input"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          set_password(e.target.value);
        }}
      />
      <button
        className="default-btn"
        onClick={(e) => {
          login_check();
        }}
      >
        Login
      </button>
      <button
        className="default-btn"
        onClick={(e) => {
          navigate("/sign-up");
        }}
      >
        Sign Up
      </button>
      {/* <div className="db-user-results">
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
      </div> */}
    </div>
  );
}

export default Login;
