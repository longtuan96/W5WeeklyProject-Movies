import React, { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useHistory } from "react-router";
import api from "../apiService";
import SliderMovies from "../components/SliderMovies";

const Homepage = ({ getImgUrl, getRandomInt, addToFavorite }) => {
  const [discoveryData, setDiscoveryData] = useState(null);
  const [discoveryDataSortByVote, setDiscoveryDataSortByVote] = useState(null);
  const [randomDiscoveryMovies, setRandomDiscoveryMovies] = useState([]);
  let history = useHistory();
  const getDiscoveryData = async () => {
    let url = `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;
    const res = await api.get(url);

    setDiscoveryData(res.data.results);
    res && get3RandomDiscovery(res.data.results);
  };
  const getDiscoveryDataSortByVote = async () => {
    let url = `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=revenue.desc`;
    const res = await api.get(url);
    console.log(res.data.results);
    setDiscoveryDataSortByVote(res.data.results);
  };

  const get3RandomDiscovery = (array) => {
    let tempArrayForDMovies = [];
    for (let index = 0; index < 3; index++) {
      tempArrayForDMovies.push(array[getRandomInt(20)]);
    }
    setRandomDiscoveryMovies(tempArrayForDMovies);
  };

  const changeToMovieDetail = (id) => {
    history.push(`/movie/${id}`);
  };

  useEffect(() => {
    getDiscoveryData();
    getDiscoveryDataSortByVote();
  }, []);
  return (
    <div>
      <Carousel>
        {randomDiscoveryMovies.map((item, itemIndex) => (
          <Carousel.Item key={item.original_title} interval={2000}>
            <img
              className="d-block w-100 carousel-img"
              src={getImgUrl(item.backdrop_path)}
              alt={`${itemIndex} slide`}
            />
            <Carousel.Caption className="text-left carousel-caption">
              <h1>{item.title}</h1>
              <p>{item.overview}</p>
              <Button
                variant="secondary"
                className="carousel-button"
                onClick={() => addToFavorite(item)}
              >
                Add to favorite
              </Button>
              <Button
                variant="light"
                className="carousel-button"
                onClick={() => changeToMovieDetail(item.id)}
              >
                More info
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container">
        <SliderMovies
          changeToMovieDetail={changeToMovieDetail}
          moviesData={discoveryData}
          getImgUrl={getImgUrl}
          nameOfSection="Most Popular Movies"
        />
        <SliderMovies
          changeToMovieDetail={changeToMovieDetail}
          moviesData={discoveryDataSortByVote}
          getImgUrl={getImgUrl}
          nameOfSection="Top Rated movies"
        />
      </div>
    </div>
  );
};

export default Homepage;
