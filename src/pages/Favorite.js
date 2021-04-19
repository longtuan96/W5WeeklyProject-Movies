import React from "react";
import { Container, Row } from "react-bootstrap";

const Favorite = ({ favortieMovies, getImgUrl }) => {
  return (
    <Container className="text-center favorite-page" fluid>
      <h1 className="title">{`There are ${favortieMovies.length} movies in the list.`}</h1>
      <Row>
        {favortieMovies.map((item) => (
          <div className="col-4">
            <a href>
              <img
                src={getImgUrl(item.poster_path)}
                alt=""
                className="movie-poster"
              />
            </a>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Favorite;
