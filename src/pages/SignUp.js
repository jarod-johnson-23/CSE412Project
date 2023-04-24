import "./SignUp.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function SignUp() {
  //Used for changing the URL and navigating between pages
  const navigate = useNavigate("");
  //Used for currently logged in user info
  const [cookies, setCookie] = useCookies(["userInfo"]);
  //These variables hold the values in the text fields on the page
  const [fName, set_fName] = useState("");
  const [lName, set_lName] = useState("");
  const [email, set_email] = useState("");
  const [dob, set_dob] = useState("");
  const [gender, set_gender] = useState("");
  const [password, set_password] = useState("");
  const [hometown, set_hometown] = useState("");
  //Regex to make sure user types in a valid date
  const regex = new RegExp(`^\\d{4}-\\d{2}-\\d{2}$`);

  //Code in the useEffect is run on page load only
  useEffect(() => {
    //Scroll to top of page
    window.scrollTo(0, 0);
  }, []);

  //Function is run when user presses the sign up button
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
      console.log("INVALID INPUTS");
    } else {
      //Otherwise call the API to add a user to the database
      Axios.post("https://cse412project-server.onrender.com/register-user", {
        //This is the body of the request, POST requests can store values here to be passed on to the back-end
        fName: fName,
        lName: lName,
        email: email,
        dob: dob,
        gender: gender,
        hashPass: password,
        hometown: hometown,
      }).then((response) => {
        //If there was an error the response.data is empty
        if (response.data.length === 0) {
          console.log("No Account Found");
        } else {
          //The API returns the info of the user that just logged in. That data is turned to JSON and stored in the cookie
          setCookie("userInfo", JSON.stringify(response.data[0]), {
            path: "/",
          });
          //Go to the homepage
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
          {/* This input element updates the value of the email variable everytime it is changed */}
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
            placeholder="First Name"
            value={fName}
            onChange={(e) => {
              set_fName(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Hometown"
            value={hometown}
            onChange={(e) => {
              set_hometown(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => {
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
              set_password(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => {
              set_lName(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dob}
            onChange={(e) => {
              set_dob(e.target.value);
            }}
          />
          {/* When the button is clicked the createAccount function is run */}
          <button
            className="default-btn"
            onClick={(e) => {
              createAccount();
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
