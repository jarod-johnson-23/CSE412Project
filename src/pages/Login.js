import "./Login.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  let navigate = useNavigate();

  const error = document.querySelector(".error-text");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const login_check = () => {
    if (email.length === 0 || password.length === 0) {
      const error = document.querySelector(".error-text");
      error.style.visibility = "visible";
    } else {
      const hashPass = password;
      Axios.post("https://cse412project-server.onrender.com/login-user", {
        email: email,
        hashPass: hashPass,
      }).then((response) => {
        if (response.data.length === 0) {
          error.style.visibility = "visible";
        } else {
          setCookie("userInfo", JSON.stringify(response.data[0]), {
            path: "/",
          });
          navigate("/home");
        }
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login-body">
      <div className="login-center">
        <h1>Login</h1>
        <p className="error-text">Invalid Email or Password</p>
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
          type="password"
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
        <div className="login-other-options">
          <p>Don't have an account?</p>
          <button
            className="default-btn"
            onClick={(e) => {
              navigate("/sign-up");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
