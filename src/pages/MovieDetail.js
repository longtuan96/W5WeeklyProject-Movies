import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import api from "../apiService";
import heartLogo from "../images/heartv2.png";
import homeLogo from "../images/home.png";
const MovieDetail = ({ getImgUrl, addToFavorite }) => {
  const history = useHistory();
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState(null);

  const handleHome = () => {
    history.push("/");
  };

  const getSingleMovie = async () => {
    let url = `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const res = await api.get(url);

    setSingleMovie(res.data);
  };
  console.log(singleMovie);
  useEffect(() => {
    getSingleMovie();
  }, []);
  return (
    <div className="container movie-detail d-flex flex-column align-items-center">
      {singleMovie && (
        <div className="row">
          <div className="col  movie-info d-flex justify-content-center">
            <img
              className="movie-poster"
              src={getImgUrl(singleMovie.poster_path)}
              alt="Movie Poster"
            />
          </div>
          <div className="col movie-info">
            <h1 className="movie-title">{singleMovie.original_title}</h1>
            <h3>{singleMovie.tagline}</h3>
            <hr />
            <div className="d-flex ">
              <p className="movie-stat">{`Score: ${singleMovie.vote_average}`}</p>

              <p className="movie-stat">
                {moment(singleMovie.release_date).format("YYYY")}
              </p>
              <p className="movie-stat">{`Run Time: ${singleMovie.runtime} minutes`}</p>
            </div>
            <hr />
            <p className="movie-description">{singleMovie.overview}</p>
            <hr />
            <div className="d-flex">
              {singleMovie &&
                singleMovie.genres.map((item) => (
                  <div key={item.id} className="tagBox">
                    {item.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <div className="d-flex movie-button">
        <Button
          variant="outline-light"
          className="likeButton"
          onClick={() => addToFavorite(singleMovie)}
        >
          <img src={heartLogo} alt="" className="icon" />
        </Button>
        <Button variant="light" onClick={handleHome}>
          <img src={homeLogo} alt="" className="icon" />
        </Button>
      </div>
    </div>
  );
};

export default MovieDetail;
