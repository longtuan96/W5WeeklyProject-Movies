import React from "react";
import Slider from "react-slick";

const SliderMovies = ({
  moviesData,
  getImgUrl,
  nameOfSection,
  changeToMovieDetail,
}) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "transparent",
          position: "absolute",
          right: "-2%",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "transparent",
          position: "absolute",
          left: "-2%",
          zIndex: 100,
        }}
        onClick={onClick}
      />
    );
  }

  let settings = {
    dots: true,
    arrow: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "50px",
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
    lazyLoad: "progressive",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    classNames: "sliderBox",
  };
  return (
    <div className="">
      <h1 className="title">{nameOfSection}</h1>
      <Slider {...settings} className="slider">
        {moviesData &&
          moviesData.map((item) => (
            <div className="" key={item.id}>
              <a href onClick={() => changeToMovieDetail(item.id)}>
                <img
                  className="sliderBox-img"
                  src={getImgUrl(item.backdrop_path)}
                  alt="movie backdrop"
                />
              </a>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SliderMovies;
