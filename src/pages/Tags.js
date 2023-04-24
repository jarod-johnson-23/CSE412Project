import "./Tags.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import FormData from "form-data";
import trashcan from "./../img/trashcan.svg";
import Photo from "./Photo";

function Tags() {
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const [search_term, set_search_term] = useState("");
  const [album, set_album] = useState([]);
  const [photo, set_photo] = useState([]);
  const [tagList, set_tags] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let baseURL = "https://cse412project-server.onrender.com/";
  //let baseURL = "http://localhost:3307/";

  const get_tags = () => {
    Axios.get(baseURL + "/get-all-images-by-tag/" + search_term).then(
      (response) => {
        set_tags(response.data);
        //console.log(response.data);
      }
    );
  };

  return (
    <>
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
          placeholder="Enter tags"
          value={search_term}
          onChange={(e) => {
            set_search_term(e.target.value);
          }}
        />
        <button
          onClick={() => {
            get_tags();
          }}
        >
          Search
        </button>
      </div>
      <div>
        {tagList.map((val, key) => {
          var arrayBuff = new Uint8Array(val.data.data);
          var blob = new Blob([arrayBuff], { type: "image/jpg" });
          var urlCreate = window.URL || window.webkitURL;
          var image = urlCreate.createObjectURL(blob);
          return (
            <div className="photo-card" key={key}>
              <img
                src={image}
                id={val.pid}
                onClick={(e) => {
                  navigate("/photo/" + val.pid);
                }}
              />
              <div className="album-photo-body">
                <div className="photo-details">
                  <h3>{val.date.substring(0, 10)}</h3>
                  <div className="photo-details-bottom">
                    <p>{val.caption}</p>
                  </div>
                </div>
                {/* <div className="tag-details">
                  <p>Tags:</p>
                  {tagList
                    .filter((tag, key) => tag.pid === val.pid)
                    .map((correctTag) => (
                      <p key={correctTag.name + correctTag.pid}>
                        {correctTag.name}
                      </p>
                    ))}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Tags;
