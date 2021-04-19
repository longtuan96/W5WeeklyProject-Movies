import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import api from "../apiService";

const Header = ({ getImgUrl }) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const handleClose = () => setShow(false);

  const [result, setResult] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const history = useHistory();

  const changeToMovieDetail = (id) => {
    history.push(`/movie/${id}`);
    setShow(false);
  };

  const handleSearch = async (e, keyword) => {
    try {
      e.preventDefault();

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&query=${encodeURIComponent(keyword)}`;
      // let url =
      //   "/search/movie?api_key=60cc3ef1d4ff1add46ef487d31797e05&query=avenger";
      const res = await api.get(url);
      console.log("work", url);
      setResult(res.data.results);
    } catch (error) {
      console.log(error.message);
    }
    setShow(true);
  };

  const getInput = (e) => {
    setKeyWord(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        console.log("changeHeader");
        setStatus("header--scroll");
      } else {
        setStatus("");
      }
    };
  }, [status]);
  return (
    <div>
      <Navbar
        fixed="top"
        className={
          status !== "header--scroll" ? "header" : "header headerScroll"
        }
        variant="dark"
      >
        <Navbar.Brand href="#home">The Movie DB</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={"/"}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={"/movie"}>
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to={"/favorite"}>
            Favorites
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={(e) => handleSearch(e, keyWord)}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={getInput}
          />
          <Button type="submit" variant="outline-info">
            Search
          </Button>
        </Form>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        {result === null ? (
          <h1>There are no search</h1>
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>{`There are ${result.length} movies`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {result &&
                  result.map((item) => (
                    <div className="col-4">
                      <a href onClick={() => changeToMovieDetail(item.id)}>
                        <img
                          src={getImgUrl(item.poster_path)}
                          alt=""
                          className="movie-poster"
                        />
                      </a>
                    </div>
                  ))}
              </Row>
            </Modal.Body>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Header;
