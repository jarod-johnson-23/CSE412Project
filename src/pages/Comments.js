import "./Comments.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import FormData from "form-data";
import trashcan from "./../img/trashcan.svg";


function Comments() {

    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
    const [comments, set_comments] = useState([]);
    const [search_term, set_search_term] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let baseURL = "https://cse412project-server.onrender.com";
    //let baseURL = "http://localhost:3307";

    const get_comments = () => {
        Axios.get(baseURL + "/get-comment-by-substring/" + search_term).then((response) => {
            set_comments(response.data);
        });
    }

    return <>

        <div class="topnav">
            <button
                className="default-btn go-back"
                onClick={(e) => {
                    navigate(-1);
                }}
            >
                Go Back
            </button>
            <input
                type="text"
                placeholder="Search for a comment by substring.."
                value={search_term}


                onChange={(e) => {
                    set_search_term(e.target.value);
                }}

            />
            <button onClick={() => {
                get_comments();
            }}>Search</button>

        </div>
        <div>
            {comments.map((val, key) => {
                return (
                    <div className="comment-card">
                        <h3> {val.fName + " " + val.lName} </ h3>
                        <p> {val.text} </p>
                    </ div>);
            })}
        </div>

    </>
}
export default Comments;