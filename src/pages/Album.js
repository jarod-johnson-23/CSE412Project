import "./Album.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import FormData from "form-data";

function Album() {
  const [cookies, removeCookie] = useCookies(["userInfo"]);
  const [album, set_album] = useState([]);
  const [photos, set_photos] = useState([]);
  const [photoCaption, set_photoCaption] = useState("");
  const [imageFile, set_imageFile] = useState();
  let { aid } = useParams();
  let navigate = useNavigate();

  let baseURL = "https://cse412project-server.onrender.com";

  const addPhoto = () => {
    let data = new FormData();
    data.append("aid", aid);
    data.append("caption", photoCaption);
    data.append("file", imageFile, imageFile.name);
    Axios.post(baseURL + "/add-photo", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    }).then((response) => {
      if (response.data === "Success") {
        window.location.reload(false);
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

  useEffect(() => {
    Axios.get(baseURL + "/get-album/" + aid).then((response) => {
      set_album(response.data[0]);
    });
    Axios.get(baseURL + "/get-photos-from-album/" + aid).then((response) => {
      set_photos(response.data);
    });
  }, []);

  return (
    <div className="album-body">
      <button
        className="default-btn"
        onClick={(e) => {
          navigate("/home");
        }}
      >
        Return Home
      </button>
      <div className="photo-list-title">
        <h1>{album.name}</h1>
        <button
          className="default-btn"
          onClick={(e) => {
            openPopup();
          }}
        >
          New Photo +
        </button>
      </div>
      <div className="popup">
        <div className="popup-content">
          <div className="popup-top">
            <h2>Add a new photo</h2>
            <button
              className="default-btn close"
              onClick={(e) => {
                set_photoCaption("");
                set_imageFile();
              }}
            >
              Close
            </button>
          </div>
          <input
            type="text"
            className="text-field"
            placeholder="Caption"
            value={photoCaption}
            onChange={(e) => {
              set_photoCaption(e.target.value);
            }}
          />
          <input
            type="file"
            id="image-input"
            name="image-input"
            accept="image\png, image\jpg, image\jpeg"
            onChange={(e) => {
              set_imageFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <button
            className="default-btn close"
            onClick={(e) => {
              addPhoto();
            }}
          >
            Create
          </button>
        </div>
      </div>

      <div className="photo-list">
        {photos.map((val, key) => {
          var arrayBuff = new Uint8Array(val.data.data);
          var blob = new Blob([arrayBuff], { type: "image/jpg" });
          var urlCreate = window.URL || window.webkitURL;
          var image = urlCreate.createObjectURL(blob);
          return (
            <div className="photo-card" key={key}>
              <img src={image} id={val.pid} />
              <div className="photo-details">
                <h3>{val.date.substring(0, 10)}</h3>
                <p>{val.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Album;
