import "./Album.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import FormData from "form-data";
import trashcan from "./../img/trashcan.svg";

function Album() {
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const [album, set_album] = useState([]);
  const [photos, set_photos] = useState([]);
  const [photoCaption, set_photoCaption] = useState("");
  const [tags, set_tags] = useState("");
  const [imageFile, set_imageFile] = useState();
  const [tagList, set_tagList] = useState([]);
  let { aid } = useParams();
  let navigate = useNavigate();

  let baseURL = "https://cse412project-server.onrender.com";
  //let baseURL = "http://localhost:3307";

  const addPhoto = () => {
    //Photo is too large to be passed normally in the body of the request
    //Instead it is passed as form data and the request's headers are changed to allow form-data
    let data = new FormData();
    data.append("aid", aid);
    data.append("caption", photoCaption);
    data.append("tags", tags);
    data.append("file", imageFile, imageFile.name);
    Axios.post(baseURL + "/add-photo", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    }).then((response) => {
      if (response.data === "Success") {
        Axios.post(baseURL + "/set-contribution", {
          contribution: cookies.userInfo.contribution + 1,
          UID: cookies.userInfo.UID,
        }).then((response) => {
          var user = cookies.userInfo;
          user.contribution = user.contribution + 1;
          setCookie("userInfo", JSON.stringify(user), {
            path: "/",
          });
        });
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

  const deletePhoto = (pid) => {
    Axios.delete(`${baseURL}/delete-photo/${pid}`).then((response) => {
      set_photos((photos) =>
        photos.filter((val) => {
          return val.pid !== pid;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get(baseURL + "/get-album/" + aid)
      .then((response) => {
        set_album(response.data[0]);
      })
      .finally((e) => {
        Axios.get(baseURL + "/get-photos-from-album/" + aid)
          .then((response1) => {
            set_photos(response1.data);
          })
          .finally((e) => {});
      });
    Axios.get(baseURL + "/get-tags").then((response2) => {
      set_tagList(response2.data);
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
            type="text"
            className="text-field"
            placeholder="Separate Tags by ','"
            value={tags}
            onChange={(e) => {
              set_tags(e.target.value);
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
                    <button
                      className="default-btn"
                      id="trash-btn"
                      onClick={(e) => {
                        deletePhoto(val.pid);
                      }}
                    >
                      <img src={trashcan} />
                    </button>
                  </div>
                </div>
                <div className="tag-details">
                  <p>Tags:</p>
                  {tagList
                    .filter((tag, key) => tag.pid === val.pid)
                    .map((correctTag) => (
                      <p key={correctTag.name + correctTag.pid}>
                        {correctTag.name}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Album;
