import React, { useEffect, useRef } from "react";
import Swiper from "swiper";

function Slider({ sliderdata }) {
  const sliderId = "mySlider";
  const slideshowRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(`#${sliderId}`, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: () => {},
      },
    });

    const interval = setInterval(() => {
      swiper.slideNext();
    }, 8000);

    return () => {
      clearInterval(interval);
      swiper.destroy();
    };
  }, [sliderId]);

  return (
    <div
      id={sliderId}
      className="swiper-container hero-slider"
      ref={slideshowRef}
      style={{ overflow: "hidden" }}
    >
      <div className="swiper-wrapper">
        {sliderdata?.map((data) => (
          <div className="swiper-slide hero-content-wrap" key={data.id}>
            <img
              src={data?.image}
              alt={data?.title}
              id="newslidebanner"
              style={{ width: "100%" }}
            />
            <div className="hero-content-overlay position-absolute w-100">
              <div className="container h-100"></div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="swiper-button-prev custom-button"
        onClick={() => slideshowRef.current?.swiper.slidePrev()}
      ></div>
      <div
        className="swiper-button-next custom-button"
        onClick={() => slideshowRef.current?.swiper.slideNext()}
      ></div>
    </div>
  );
}

export default Slider;
