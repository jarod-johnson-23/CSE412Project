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

  const [album, set_album] = useState([]);
  const [photo, set_photo] = useState([]);
  const [photoList, set_photos] = useState([]);
  const [popList, set_popular_tags] = useState([]);
  const [tagList, set_tagList] = useState([]);
  const [parsedTags, set_parsed_tags] = useState([]);
  var { state, searchTerm } = useParams();
  const [search_term, set_search_term] = useState(searchTerm);

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // get all images given the state of the button for all or personal photos.
    get_photos();
    getPopularTags();

    Axios.get(baseURL + "/get-tags").then((response2) => {
      set_tagList(response2.data);
    });

    console.log(search_term);
  }, []);

  let baseURL = "https://cse412project-server.onrender.com";
  //let baseURL = "http://localhost:3307/";

  useEffect(() => {
    get_photos();
  }, [state]);

  const search_photos = () => {
    // if (search_term) {
    //   Axios.get(baseURL + "/get-photos-by-tag/" + search_term).then(
    //     (response) => {
    //       var pidList = [];
    //       var filteredPhotos = [];
    //       for (var i = 0; i < response.data.length; i++) {
    //         filteredPhotos.push(
    //           allPhotos.filter((val) => val.pid === response.data[i].pid)
    //         );
    //       }
    //       set_photos(new Map(filteredPhotos));
    //     }
    //   );
    // } else {
    //   set_photos(allPhotos);
    // }
  };

  const get_photos = () => {
    var filteredPhotos = [];
    var allPhotos = [];
    if (state == "A") {
      if (search_term) {
        Axios.get(baseURL + "/get-all-images").then((response) => {
          allPhotos = response.data;
          Axios.get(baseURL + "/get-photos-by-tag/" + search_term)
            .then((response2) => {
              for (var i = 0; i < response2.data.length; i++) {
                for (var j = 0; j < allPhotos.length; j++) {
                  if (allPhotos[j].pid === response2.data[i].pid) {
                    filteredPhotos.push(allPhotos[j]);
                  }
                }
              }
            })
            .finally(() => {
              set_photos(filteredPhotos);
            });
        });
      } else {
        Axios.get(baseURL + "/get-all-images").then((response) => {
          set_photos(response.data);
          //console.log(response.data);
        });
      }
    } else if (state == "P") {
      if (search_term) {
        Axios.get(baseURL + "/get-user-images/" + cookies.userInfo.UID).then(
          (response) => {
            allPhotos = response.data;
            Axios.get(baseURL + "/get-photos-by-tag/" + search_term)
              .then((response2) => {
                for (var i = 0; i < response2.data.length; i++) {
                  for (var j = 0; j < allPhotos.length; j++) {
                    if (allPhotos[j].pid === response2.data[i].pid) {
                      filteredPhotos.push(allPhotos[j]);
                    }
                  }
                }
              })
              .finally(() => {
                set_photos(filteredPhotos);
              });
          }
        );
      } else {
        Axios.get(baseURL + "/get-user-images/" + cookies.userInfo.UID).then(
          (response) => {
            set_photos(response.data);
            //console.log(response.data);
          }
        );
      }
    } else {
      console.log("Error in tag-search");
    }
  };

  const getPopularTags = async (uid) => {
    const date = Date.now();
    let currentDate = null;
    //Very bad programming practice but makes sure the userInfo cookie is set before using its value in the API call
    do {
      currentDate = Date.now();
    } while (currentDate - date < 500);
    Axios.get(baseURL + "/get-popular-tags/").then((response) => {
      set_popular_tags(response.data);
    });
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
          placeholder="Enter tags (Separate by '-')"
          value={search_term}
          onChange={(e) => {
            set_search_term(e.target.value);
          }}
        />
        <button
          onClick={() => {
            navigate("/tag-search/" + state + "/" + search_term);
            window.location.reload(false);
          }}
        >
          Search
        </button>

        <button
          onClick={() => {
            navigate("/tag-search/P");
            window.location.reload(false);
          }}
        >
          View Personal
        </button>

        <button
          onClick={() => {
            navigate("/tag-search/A");
            window.location.reload(false);
          }}
        >
          View All
        </button>
      </div>
      <div className="home-body">
        <div className="left-side">
          <div className="top-user-card">
            <h2>Top Tags:</h2>
            {popList.map((val, key) => {
              return (
                <p
                  className="tag-text"
                  onClick={() => {
                    navigate("/tag-search/A/" + val.name);
                  }}
                >
                  {val.name}
                </p>
              );
            })}
          </div>
        </div>

        <div className="profile-body">
          {photoList.map((val, key) => {
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
    </>
  );
}
export default Tags;
