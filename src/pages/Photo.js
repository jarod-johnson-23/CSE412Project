import "./Photo.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Photo() {
  const [photo, set_photo] = useState([]);
  //pid is the value that is passed in by the URL
  let { pid } = useParams();
  let navigate = useNavigate();

  const getPhoto = () => {
    //get photo and save response.data[0] to photo array
  };

  const getLikes = () => {
    //get likes and save response.data to likes array
  };

  const getComments = () => {
    //get comments and save response.data to comments array
  };

  //All this code is run on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    getPhoto();
    getComments();
    getLikes();
  }, []);

  return (
    <div className="photo-body">
      <h1 className="h1-text">{pid}</h1>
      <button
        className="default-btn"
        onClick={(e) => {
          navigate("/home");
        }}
      >
        Go Home
      </button>
    </div>
  );
}

export default Photo;
