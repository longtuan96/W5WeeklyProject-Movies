import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MovieDetail from "./pages/MovieDetail";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";
import "react-input-range/lib/css/index.css";

function App() {
  const favortieMovies = [];

  const getImgUrl = (imgLink) => {
    return `${process.env.REACT_APP_BACKEND_IMG_API}/original${imgLink}`;
  };

  const addToFavorite = (item) => {
    favortieMovies.push(item);
    console.log("Favorite: ", favortieMovies);
  };

  const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
  };

  return (
    <div className="App">
      <Router>
        <Header getImgUrl={getImgUrl} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Homepage
                getImgUrl={getImgUrl}
                getRandomInt={getRandomInt}
                addToFavorite={addToFavorite}
              />
            )}
          />
          <Route
            path="/movie"
            exact
            component={() => (
              <Movies
                getImgUrl={getImgUrl}
                getRandomInt={getRandomInt}
                addToFavorite={addToFavorite}
              />
            )}
          />
          <Route
            path="/movie/:id"
            exact
            component={() => (
              <MovieDetail
                getImgUrl={getImgUrl}
                addToFavorite={addToFavorite}
              />
            )}
          />
          <Route
            path="/favorite"
            exact
            component={() => (
              <Favorite favortieMovies={favortieMovies} getImgUrl={getImgUrl} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
