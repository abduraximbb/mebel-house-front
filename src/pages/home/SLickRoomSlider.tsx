import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import line from "../../assets/images/line.svg";
import arrow from "../../assets/images/arrow.svg";
import sliderBtn from "../../assets/images/sliderBtn.svg";
import { cardCarousel } from "../../assets/const/cardCarousel";
import { useState, useRef } from "react";

const SlickRoomSLider = () => {
  const [currentSlide, setCurrentSlide] = useState(cardCarousel[0].id);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    useCSS: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index: number) => {
      setCurrentSlide(cardCarousel[index].id);
    },
    customPaging: function (i: number) {
      return (
        <div
          className={`slick-dot ${
            currentSlide === cardCarousel[i].id ? "slick-active" : ""
          }`}
        >
          <div className="dot-inner"></div>
        </div>
      );
    },
    responsive: [
      {
        breakpoint: 1426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="bg-[#FCF8F3] mb-[67px]">
      <div className="lg:pl-[100px] py-[44px] lg:pr-0 flex lg:items-center lg:flex-row gap-11 flex-col px-3">
        <div className="w-auto">
          <h1 className="text-[#3A3A3A] font-bold lg:text-[40px] lg:leading-[48px] mb-2 sm:text-2xl text-lg">
            50+ Beautiful rooms inspiration
          </h1>
          <p className="text-[#616161] font-medium lg:leading-6 max-w-[368px] text-sm">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <button className="bg-bg-primary mt-[25px] py-3 min-w-[176px] text-[#FFFFFF] font-semibold leading-6 hover:bg-yellow-700 duration-300">
            Explore More
          </button>
        </div>
        <div className="lg:w-11/12 overflow-hidden relative">
          {currentSlide !== 1 && (
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute z-10 top-56 lg:left-6 left-0 scale-[-1] w-12 h-12 rounded-full shadow-2xl bg-white flex items-center justify-center"
            >
              <img src={sliderBtn} alt="prev-btn-icon" />
            </button>
          )}
          <div className="overflow-hidden scroll-smooth">
            <Slider {...settings} ref={sliderRef}>
              {cardCarousel.map((item) => (
                <div
                  key={item.id}
                  className={`${
                    currentSlide === item.id
                      ? "w-[404px] h-[482px]"
                      : "w-[372px] h-[386px]"
                  } relative px-3`}
                >
                  <img
                    src={item.img}
                    alt="product-img"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute z-20 left-6 bottom-6 select-none flex items-end ${
                      currentSlide === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="bg-white py-6 px-8 w-auto opacity-90">
                      <div className="flex gap-2 items-center">
                        <span className="font-medium">{item.level}</span>
                        <img src={line} alt="line-icon" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <h1 className="mt-[8px] font-semibold text-2xl">
                        {item.subTitle}
                      </h1>
                    </div>
                    <div className="bg-bg-primary flex items-center justify-center w-[40px] h-[40px] hover:bg-yellow-700 duration-300">
                      <img src={arrow} alt="arrow-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute z-10 top-56 lg:right-6 right-0 w-12 h-12 rounded-full shadow-2xl bg-white flex items-center justify-center"
          >
            <img src={sliderBtn} alt="next-btn-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SlickRoomSLider;
