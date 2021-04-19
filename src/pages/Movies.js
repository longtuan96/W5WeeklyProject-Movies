import { Dropdown, DropdownButton } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Tab, Tabs, Pagination } from "react-bootstrap";
import { useHistory } from "react-router";
import api from "../apiService";
// import InputRange from "react-input-range";

const Movies = ({ getImgUrl, getRandomInt }) => {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState(null);
  const [totalPageNowPlaying, setTotalPageNowPlaying] = useState(0);
  const [totalPagePopular, setTotalPagePopular] = useState(0);
  const [totalPageTopRated, setTotalPageTopRated] = useState(0);
  const [totalPageUpComing, setTotalPageUpComing] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPopular, setMoviesPopular] = useState(null);
  const [moviesTopRated, setMoviesTopRated] = useState(null);
  const [moviesUpComing, setMoviesUpComing] = useState(null);

  // const [originalListNP, setOriginalListNP] = useState(null);
  // const [originalListP, setOriginalListP] = useState(null);
  // const [originalListTR, setOriginalListTR] = useState(null);
  // const [originalListUC, setOriginalListUC] = useState(null);
  // let [year, setYear] = useState({ min: 1980, max: 2020 });
  // let [rating, setRating] = useState({ min: 0, max: 10 });
  // let originalListNP = [];
  // let originalListP = [];
  // let originalListTR = [];
  // let originalListUC = [];
  const firstPage = 1;
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  const history = useHistory();

  const changeToMovieDetail = (id) => {
    history.push(`/movie/${id}`);
  };

  const moviesSort = (array, direction, param) => {
    if (direction === "high to low" && param === "rating") {
      return [...array.sort((a, b) => a.vote_average - b.vote_average)];
    } else if (direction === "low to high" && param === "rating") {
      return [...array.sort((a, b) => b.vote_average - a.vote_average)];
    } else if (direction === "high to low" && param === "popularity") {
      return [...array.sort((a, b) => a.popularity - b.popularity)];
    } else if (direction === "low to high" && param === "popularity") {
      return [...array.sort((a, b) => b.popularity - a.popularity)];
    }
  };

  const getMoviesNowPlaying = async () => {
    let url = `/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;

    const res = await api.get(url);
    setTotalPageNowPlaying(res.data.total_pages);
    // originalListNP = res.data.results;
    console.log(res.data.total_pages);
    setMoviesNowPlaying(res.data.results);
  };
  const getMoviesPopular = async () => {
    let url = `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;
    const res = await api.get(url);
    // originalListP = res.data.results;
    setTotalPagePopular(res.data.total_pages);
    setMoviesPopular(res.data.results);
  };
  const getMoviesTopRated = async () => {
    let url = `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;
    const res = await api.get(url);
    setTotalPageTopRated(res.data.total_pages);
    // originalListTR = res.data.results;
    setMoviesTopRated(res.data.results);
  };
  const getMoviesUpComing = async () => {
    let url = `/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;
    const res = await api.get(url);
    setTotalPageUpComing(res.data.total_pages);
    // originalListUC = res.data.results;
    setMoviesUpComing(res.data.results);
  };

  const handleSort = (direction, param) => {
    setMoviesNowPlaying(moviesSort(moviesNowPlaying, direction, param));
    setMoviesPopular(moviesSort(moviesPopular, direction, param));
    setMoviesTopRated(moviesSort(moviesTopRated, direction, param));
    setMoviesUpComing(moviesSort(moviesUpComing, direction, param));
  };

  const handlePageClick = (numPage) => {
    setCurrentPage(numPage);
  };

  // const filterByRate = (value) => {
  //   let filteredListNP = originalListNP.filter(
  //     (movie) =>
  //       movie.vote_average > value.min && movie.vote_average < value.max
  //   );
  //   let filteredListP = originalListP.filter(
  //     (movie) =>
  //       movie.vote_average > value.min && movie.vote_average < value.max
  //   );
  //   let filteredListTR = originalListTR.filter(
  //     (movie) =>
  //       movie.vote_average > value.min && movie.vote_average < value.max
  //   );
  //   let filteredListUC = originalListUC.filter(
  //     (movie) =>
  //       movie.vote_average > value.min && movie.vote_average < value.max
  //   );
  //   setRating(value);

  //   setMoviesNowPlaying(filteredListNP);
  //   setMoviesPopular(filteredListP);
  //   setMoviesTopRated(filteredListTR);
  //   setMoviesUpComing(filteredListUC);
  // };

  // const filterByYear = (value) => {
  //   let filteredListNP = originalListNP.filter((movie) => {
  //     let year = parseInt(movie.release_date.split("-")[0]);
  //     return year > value.min && year < value.max;
  //   });
  //   let filteredListP = originalListP.filter((movie) => {
  //     let year = parseInt(movie.release_date.split("-")[0]);
  //     return year > value.min && year < value.max;
  //   });
  //   let filteredListTR = originalListTR.filter((movie) => {
  //     let year = parseInt(movie.release_date.split("-")[0]);
  //     return year > value.min && year < value.max;
  //   });
  //   let filteredListUC = originalListUC.filter((movie) => {
  //     let year = parseInt(movie.release_date.split("-")[0]);
  //     return year > value.min && year < value.max;
  //   });
  //   setYear(value);

  //   setMoviesNowPlaying(filteredListNP);
  //   setMoviesPopular(filteredListP);
  //   setMoviesTopRated(filteredListTR);
  //   setMoviesUpComing(filteredListUC);
  // };

  useEffect(() => {
    getMoviesNowPlaying();
    getMoviesPopular();
    getMoviesTopRated();
    getMoviesUpComing();
  }, [currentPage]);
  return (
    <Container className=" movies-page" fluid>
      <div>{console.log("test", moviesNowPlaying)}</div>
      <div className="row movies-row">
        <div className="col-2  text-right">
          <DropdownButton
            id="dropdown-basic-button"
            variant="secondary"
            title="Sort"
          >
            <Dropdown.Item onClick={() => handleSort("high to low", "rating")}>
              Sort by Rating from high to low
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort("low to high", "rating")}>
              Sort by Rating from low to high
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleSort("high to low", "popularity")}
            >
              Sort by Popularity from high to low
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleSort("low to high", "popularity")}
            >
              Sort by Popularity from low to high
            </Dropdown.Item>
          </DropdownButton>
        </div>

        <div className="col-10  ">
          <Tabs defaultActiveKey="nowPlaying" id="uncontrolled-tab-example">
            <Tab eventKey="nowPlaying" title="Now Playing">
              <div className="row">
                {moviesNowPlaying &&
                  moviesNowPlaying.map((item) => (
                    <div className="col-4">
                      <a href onClick={() => changeToMovieDetail(item.id)}>
                        <img
                          src={getImgUrl(item.poster_path)}
                          alt=""
                          className="movies-card"
                        />
                      </a>
                    </div>
                  ))}
              </div>
              <Pagination>
                <Pagination.First onClick={() => handlePageClick(firstPage)} />
                <Pagination.Prev onClick={() => handlePageClick(prevPage)} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next onClick={() => handlePageClick(nextPage)} />
                <Pagination.Last
                  onClick={() => handlePageClick(totalPageNowPlaying)}
                />
              </Pagination>
            </Tab>
            <Tab eventKey="popular" title="Popular">
              <div>
                <div className="row">
                  {moviesPopular &&
                    moviesPopular.map((item) => (
                      <div className="col-4">
                        <a href onClick={() => changeToMovieDetail(item.id)}>
                          <img
                            src={getImgUrl(item.poster_path)}
                            alt=""
                            className="movies-card"
                          />
                        </a>
                      </div>
                    ))}
                </div>
              </div>
              <Pagination>
                <Pagination.First onClick={() => handlePageClick(firstPage)} />
                <Pagination.Prev onClick={() => handlePageClick(prevPage)} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next onClick={() => handlePageClick(nextPage)} />
                <Pagination.Last
                  onClick={() => handlePageClick(totalPagePopular)}
                />
              </Pagination>
            </Tab>
            <Tab eventKey="topRated" title="Top Rated">
              <div className="row">
                {moviesTopRated &&
                  moviesTopRated.map((item) => (
                    <div className="col-4">
                      <a href onClick={() => changeToMovieDetail(item.id)}>
                        <img
                          src={getImgUrl(item.poster_path)}
                          alt=""
                          className="movies-card"
                        />
                      </a>
                    </div>
                  ))}
              </div>
              <Pagination>
                <Pagination.First onClick={() => handlePageClick(firstPage)} />
                <Pagination.Prev onClick={() => handlePageClick(prevPage)} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next onClick={() => handlePageClick(nextPage)} />
                <Pagination.Last
                  onClick={() => handlePageClick(totalPageTopRated)}
                />
              </Pagination>
            </Tab>
            <Tab eventKey="upComing" title="Upcoming">
              <div className="row">
                {moviesUpComing &&
                  moviesUpComing.map((item) => (
                    <div className="col-4">
                      <a href onClick={() => changeToMovieDetail(item.id)}>
                        <img
                          src={getImgUrl(item.poster_path)}
                          alt=""
                          className="movies-card"
                        />
                      </a>
                    </div>
                  ))}
              </div>
              <Pagination>
                <Pagination.First onClick={() => handlePageClick(firstPage)} />
                <Pagination.Prev onClick={() => handlePageClick(prevPage)} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next onClick={() => handlePageClick(nextPage)} />
                <Pagination.Last
                  onClick={() => handlePageClick(totalPageUpComing)}
                />
              </Pagination>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  );
};

export default Movies;
