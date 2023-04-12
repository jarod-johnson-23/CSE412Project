import "./SignUp.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function SignUp() {
  const navigate = useNavigate("");
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const [fName, set_fName] = useState("");
  const [lName, set_lName] = useState("");
  const [email, set_email] = useState("");
  const [dob, set_dob] = useState("");
  const [gender, set_gender] = useState("");
  const [password, set_password] = useState("");
  const [hometown, set_hometown] = useState("");
  const error1 = document.querySelector(".su-error-text");
  const regex = new RegExp(`^\\d{4}-\\d{2}-\\d{2}$`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createAccount = () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      fName.length === 0 ||
      lName.length === 0 ||
      hometown.length === 0 ||
      dob.length === 0 ||
      gender.length === 0 ||
      !regex.test(dob)
    ) {
      const error1 = document.querySelector(".su-error-text");
      error1.style.visibility = "visible";
    } else {
      Axios.post("https://cse412project-server.onrender.com/register-user", {
        fName: fName,
        lName: lName,
        email: email,
        dob: dob,
        gender: gender,
        hashPass: password,
        hometown: hometown,
      }).then((response) => {
        if (response.data.length === 0) {
          console.log("No Account Found");
        } else {
          setCookie("userInfo", JSON.stringify(response.data[0]), {
            path: "/",
          });
          navigate("/home");
        }
      });
    }
  };

  return (
    <div className="sign-up-body">
      <h1>Sign Up</h1>
      <div className="su-input-section">
        <div className="left-side">
          <input
            type="text"
            className="text-input"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_email(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="First Name"
            value={fName}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_fName(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Hometown"
            value={hometown}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_hometown(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_gender(e.target.value);
            }}
          />
        </div>
        <div className="right-side">
          <input
            type="password"
            className="text-input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_password(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_lName(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dob}
            onChange={(e) => {
              error1.style.visibility = "hidden";
              set_dob(e.target.value);
            }}
          />
          <button
            className="default-btn"
            onClick={(e) => {
              createAccount();
            }}
          >
            Create Account
          </button>
          <p className="su-error-text">Invalid Inputs</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
