import React, { useState } from "react";

const slides = [
  {
    img: "https://cdn.slidesharecdn.com/ss_thumbnails/the-pursuit-of-happiness1-150418083957-conversion-gate01-thumbnail.jpg?width=560&fit=bounds",
    caption: "FILM",
  },
  {
    img: "https://m.media-amazon.com/images/I/51xVBN-iBHL._SL500_.jpg",
    caption: "BOOK'S",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdBFL4V5dmpAiKAFJm8JD_TBp2Xh1_Aguong&s",
    caption: "MUSIC",
  },
];

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="carousel slide">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            style={{ width: "100%", height: "30rem" }}
          >
            <img src={slide.img} className="d-block w-50 mx-auto" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.caption}</h5>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={prevSlide}
      >
        <span className="carousel-control-prev-icon" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={nextSlide}
      >
        <span className="carousel-control-next-icon" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
