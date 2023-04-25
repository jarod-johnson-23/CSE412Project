import "./Photo.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import thumbsUp from "./../img/like-icon.svg";
import { useCookies } from "react-cookie";

function Photo() {
  const [photo, set_photo] = useState([]);
  const [likes, set_likes] = useState("");
  const [comments, set_comments] = useState([]);
  const [date, set_date] = useState("");
  const [comment_text, set_comment_text] = useState("");
  const [usernames, set_usernames] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const [list_tags, set_tags] = useState([]);
  //pid is the value that is passed in by the URL
  let { pid } = useParams();
  let navigate = useNavigate();

  var arrayBuff, blob, urlCreate, image;

  let baseURL = "https://cse412project-server.onrender.com";
  //let baseURL = "http://localhost:3307";

  const getPhoto = () => {
    //get photo and save response.data[0] to photo array
    Axios.get(baseURL + "/get-photo/" + pid)
      .then((response) => {
        set_photo(response.data[0]);
        set_date(response.data[0].date.substring(0, 10));
        arrayBuff = new Uint8Array(response.data[0].data.data);
      })
      .finally(() => {
        blob = new Blob([arrayBuff], { type: "image/jpg" });
        urlCreate = window.URL || window.webkitURL;
        image = urlCreate.createObjectURL(blob);
        const el = document.getElementById("main-image");
        el.src = image;
      });
  };

  const getLikes = () => {
    //get likes and save response.data to likes array
    Axios.get(baseURL + "/get-likes/" + pid).then((response) => {
      set_likes(response.data[0].likeCount);
    });
  };

  const getComments = () => {
    //get comments and save response.data to comments array
    Axios.get(baseURL + "/get-comments/" + pid).then((response) => {
      set_comments(response.data);
    });
  };

  const addLike = () => {
    Axios.post(baseURL + "/add-like", {
      uid: cookies.userInfo.UID,
      pid: pid,
    }).then((response) => {
      if (response.data === "DUPLICATE" || response.data === "ERROR") {
        const el = document.getElementById("error-msg");
        el.innerHTML = "You already liked this photo";
      } else {
        set_likes(likes + 1);
      }
    });
  };

  const addComment = () => {
    Axios.post(baseURL + "/add-comment", {
      uid: cookies.userInfo.UID,
      pid: pid,
      text: comment_text,
    }).then((response) => {
      Axios.post(baseURL + "/set-contribution", {
        contribution: cookies.userInfo.contribution + 1,
        UID: cookies.userInfo.UID,
      }).then((response) => {
        var user = cookies.userInfo;
        user.contribution = user.contribution + 1;
        setCookie("userInfo", JSON.stringify(user), {
          path: "/",
        });
        window.location.reload(false);
      });
    });
  };

  const getUsernames = () => {
    Axios.get(baseURL + "/get-users-who-liked/" + pid).then((response) => {
      set_usernames(response.data);
    });
  };

  const getTags = () => {
    Axios.get(baseURL + "/get-image-tags/" + pid).then((response) => {
      set_tags(response.data);
    });
  };

  //All this code is run on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    getPhoto();
    getComments();
    getLikes();
    getUsernames();
    getTags();
  }, []);

  return (
    <div className="photo-body">
      <button
        className="default-btn go-back"
        onClick={(e) => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
      <div className="photo-page-card">
        <img src={""} id="main-image" />
        <div className="photo-page-card-info">
          <h3>{photo.caption}</h3>
          <p>Date: {date}</p>
          <p>Likes: {likes}</p>
          <div className="photo-tags tags-div-photos">
            <p>Tags: </p>
            {list_tags.map((val, key) => {
              return (
                <div>
                  <p className="tags-text">{val.name} </p>
                </div>
              );
            })}
          </div>
          <p id="error-msg"></p>
          <button
            className="default-btn"
            id="trash-btn"
            onClick={(e) => {
              addLike();
            }}
          >
            <img src={thumbsUp} />
          </button>
          <div className="users-who-liked">
            <p>Users who liked this photo: </p>
            {usernames.map((val, key) => {
              return <p key={key}>{" " + val.fName + " " + val.lName}</p>;
            })}
          </div>
        </div>
      </div>
      <div className="comments-header">
        <h1>Comments:</h1>
        <input
          type="text"
          className="text-input"
          placeholder="Leave a comment"
          id="comment-input"
          value={comment_text}
          onChange={(event) => {
            set_comment_text(event.target.value);
          }}
        />
        <button
          className="default-btn"
          id="comment-btn"
          onClick={(e) => {
            addComment();
          }}
        >
          Add Comment
        </button>
      </div>

      <div className="comment-list">
        {comments.map((val, key) => {
          return (
            <div className="comment-card" key={key}>
              <h4>{val.fName + " " + val.lName}</h4>
              <p>{val.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Photo;
