import "./Home.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import placeholder from "./../img/placeholder.png";
import Axios from "axios";

function Home() {
  const [cookies, removeCookie] = useCookies(["userInfo"]);
  const [albums, set_albums] = useState([]);
  const [albumName, set_albumName] = useState("");

  let baseURL = "https://cse412project-server.onrender.com";

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
    do {
      currentDate = Date.now();
    } while (currentDate - date < 500);
    Axios.post(baseURL + "/get-personal-albums", {
      uid: cookies.userInfo.UID,
    }).then((response) => {
      set_albums(response.data);
    });
  };

  const getFirstPic = (aid) => {
    Axios.get(baseURL + "/get-first-pic/" + aid).then((response) => {
      if (response.data.length !== 0) {
        var arrayBuff = new Uint8Array(response.data[0].data.data);
        var blob = new Blob([arrayBuff], { type: "image/jpg" });
        var urlCreate = window.URL || window.webkitURL;
        var image = urlCreate.createObjectURL(blob);
        const img = document.getElementById(aid + "img");
        img.src = image;
      } else {
        const img = document.getElementById(aid + "img");
        img.src = placeholder;
      }
    });
  };

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
      ownerID: cookies.userInfo.UID,
    }).then((response) => {
      if (response.data === "Success") {
        window.location.reload(false);
      } else {
        console.log("Can't add album right now");
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAlbums();
  }, []);

  return (
    <div className="home-body">
      <div className="profile-card">
        <h2>{cookies.userInfo.fName + " " + cookies.userInfo.lName}</h2>
        <p>Email: {cookies.userInfo.email}</p>
        <p>Birthday: {cookies.userInfo.dob}</p>
        <p>Hometown: {cookies.userInfo.hometown}</p>
        <p>
          Contribution:{" "}
          <span className="big-number">{cookies.userInfo.contribution}</span>
        </p>
        <button
          className="default-btn"
          onClick={(e) => {
            removeUserCookie().then((response) => {
              console.log("LOGGED OUT USER");
            });
          }}
        >
          Sign Out
        </button>
      </div>
      <div className="profile-body">
        <div className="section friends-div">
          <h2>Friend List</h2>
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
                <button
                  className="default-btn close"
                  onClick={(e) => {
                    createAlbum();
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="album-rows">
            {albums.map((val, key) => {
              return (
                <div
                  className="album-card"
                  key={key}
                  onClick={(e) => {
                    navigate("/album/" + val.aid);
                  }}
                >
                  <img src={getFirstPic(val.aid)} id={val.aid + "img"} />
                  <div className="album-card-stats">
                    <h3>{val.name}</h3>
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

export default Home;
