import "./OtherUsers.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import placeholder from "./../img/placeholder.png";
import trashcan from "./../img/trashcan.svg";
import Axios from "axios";

function OtherUsers() {
  const [cookies, removeCookie] = useCookies(["userInfo"]);
  const [albums, set_albums] = useState([]);
  const [albumName, set_albumName] = useState("");
  const [topUsers, set_topUsers] = useState([]);
  const [userName, set_friendship] = useState([]); //EC added
  const [searchUID, set_search_uid] = useState(0);
  const [userInformation, set_user_info] = useState([""]);

  //Base URL of the URL that holds all the APIs, just add the URI to complete the URL ex: /get-user
  let baseURL = "https://cse412project-server.onrender.com";
  //let baseURL = "http://localhost:3307";

  const userId = 10001;

  const navigate = useNavigate();

  function removeUserCookie() {
    const cookiePromise = new Promise((resolve, reject) => {
      navigate("/");
      resolve(removeCookie("userInfo", { path: "/" }));
    });
    return cookiePromise;
  }

  const getAlbums = async (uid) => {
    const date = Date.now();
    let currentDate = null;
    //Very bad programming practice but makes sure the userInfo cookie is set before using its value in the API call
    do {
      currentDate = Date.now();
    } while (currentDate - date < 500);
    Axios.post(baseURL + "/get-personal-albums", {
      uid: userId,
    }).then((response) => {
      set_albums(response.data);
    });
  };

  const getFirstPic = (aid) => {
    //GET requests cannot have a body, any parameters need to be added through the URL
    Axios.get(baseURL + "/get-first-pic/" + aid).then((response) => {
      if (response.data.length !== 0) {
        //Code to display an image from the database
        var arrayBuff = new Uint8Array(response.data[0].data.data);
        var blob = new Blob([arrayBuff], { type: "image/jpg" });
        var urlCreate = window.URL || window.webkitURL;
        var image = urlCreate.createObjectURL(blob);
        const img = document.getElementById(aid + "img");
        img.src = image;
      } else {
        //If picture is not found, the album gets a placeholder image
        const img = document.getElementById(aid + "img");
        img.src = placeholder;
      }
    });
  };

  //Function opens the popup
  const openPopup = () => {
    const popup = document.querySelector(".popup");
    const close = document.querySelector(".close");
    popup.style.display = "block";
    close.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };

  const createAlbum = () => {
    Axios.post(baseURL + "/add-album", {
      name: albumName,
      ownerID: userId,
    }).then((response) => {
      if (response.data === "Success") {
        //Also bad programming practice but refreshes the page so the new album is displayed
        window.location.reload(false);
      } else {
        console.log("Can't add album right now");
      }
    });
  };

  const deleteAlbum = (aid) => {
    //Axios.delete(`${baseURL}/delete-album/${aid}`).then((response) => {
    Axios.delete(`${baseURL}/delete-album/${aid}`).then((response) => {
      set_albums((albums) =>
        albums.filter((val) => {
          return val.aid !== aid;
        })
      );
    });
  };

  const getTopUsers = () => {
    Axios.get(baseURL + "/get-top-users").then((response) => {
      set_topUsers(response.data);
    });
  };

  const getFriends = async (uid) => {
    const date = Date.now();
    let currentDate = null;
    //Very bad programming practice but makes sure the userInfo cookie is set before using its value in the API call
    do {
      currentDate = Date.now();
    } while (currentDate - date < 500);
    Axios.get(baseURL + "/get-friends/" + userId).then((response) => {
      set_friendship(response.data);
    });
  };

  const getUserInfo = async (uid) => {
    const date = Date.now();
    let currentDate = null;
    //Very bad programming practice but makes sure the userInfo cookie is set before using its value in the API call
    do {
      currentDate = Date.now();
    } while (currentDate - date < 500);
    Axios.get(baseURL + "/get-user-info/" + userId).then((response) => {
      set_user_info(response.data);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAlbums();
    getTopUsers();
    getFriends();
    getUserInfo();
  }, []);

  return (
    <div className="home-body">
      <div className="left-side">
        <div className="profile-card">
          <h2>{userInformation[0].fName + " " + userInformation[0].lName}</h2>
          <p>Email: {userInformation[0].email}</p>
          <p>Birthday: {userInformation[0].dob}</p>
          <p>Hometown: {userInformation[0].hometown}</p>
          <p>
            Contribution:{" "}
            <span className="big-number">
              {userInformation[0].contribution}
            </span>
          </p>
          <button
            className="default-btn"
            onClick={(e) => {
            }}
          >
            Add Friend
          </button>
        </div>

        <div className="top-user-card">
          <h2>Top Users:</h2>
          {topUsers.map((val, key) => {
            return (
              <p>{val.fName + " " + val.lName + " - " + val.contribution}</p>
            );
          })}
        </div>
      </div>

      <div className="profile-body">
        {/* <div class="topnav">
        
          <a href="#addfriend">Search UserID</a>
          <input
            type="text"
            placeholder="Search.."
            val={searchUID}
            onChange={(e) => {
              set_search_uid(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // use searchUID
              // have to check that the user id exists
              // go to the users home page via uid
            }}
          >
            Search
          </button>
        </div>*/}

        <div className="section friends-div">
          <h2>Friend List</h2>
          <div class="scroll">
            {userName.map((val, key) => {
              return (
                <p>
                  {val.fName +
                    " " +
                    val.lName +
                    " Since: " +
                    val.since.substring(0, 10)}
                </p>
              );
            })}
          </div>
        </div>
        <div className="section suggestion-div">
          <h2>Suggested Friends</h2>
        </div>
        <div className="section albums-div">
          <div className="album-div-top">
            <h2>Your Photo Albums</h2>
            <button
              className="default-btn"
              onClick={(e) => {
                openPopup();
              }}
            >
              New Album +
            </button>
            <div className="popup">
              <div className="popup-content">
                <div className="popup-top">
                  <h2>Create a new Album</h2>
                  <button className="default-btn close" onClick={(e) => {}}>
                    Close
                  </button>
                </div>
                <input
                  type="text"
                  className="text-field"
                  placeholder="Album Name"
                  value={albumName}
                  onChange={(e) => {
                    set_albumName(e.target.value);
                  }}
                />
                {/* <button
                  className="default-btn close"
                  onClick={(e) => {
                    createAlbum();
                  }}
                >
                  Create
                </button> */}
              </div>
            </div>
          </div>

          <div className="album-rows">
            {/* Map function takes in an array of objects and returns a chunk of HTML for every object */}
            {/* This one returns a "card" for each album that can be used to navigate to a specific album */}
            {albums.map((val, key) => {
              return (
                <div className="album-card" key={key}>
                  <img
                    src={getFirstPic(val.aid)}
                    id={val.aid + "img"}
                    onClick={(e) => {
                      navigate("/album/" + val.aid);
                    }}
                  />
                  <div className="album-card-stats">
                    <div className="album-card-stats-top">
                      <h3>{val.name}</h3>
                      {/* <button
                        className="default-btn"
                        id="trash-btn"
                        onClick={(e) => {
                          deleteAlbum(val.aid);
                        }}
                      >
                        <img src={trashcan} />
                      </button> */}
                    </div>

                    <p>{"Date created: " + val.doc.substring(0, 10)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUsers;
