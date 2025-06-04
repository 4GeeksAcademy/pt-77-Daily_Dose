import React, { useEffect, useRef, useState } from "react";
import {
  fetchRecommendations,
  fetchBooksByGenre,
  getSongsByGenre
} from "../hooks/actions";

const genres = ["happy", "action", "pop", "romance", "mystery", "rock"];

const ContentCarousel = () => {
  const [items, setItems] = useState([]);
  const [liked, setLiked] = useState({});
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];

    Promise.all([
      fetchRecommendations(randomGenre),
      fetchBooksByGenre(randomGenre),
      getSongsByGenre(randomGenre)
    ]).then(([movies, books, music]) => {
      const taggedMovies = movies.map((item) => ({
        title: item.title,
        author: "",
        year: item.year || "",
        image: item.poster || "",
        type: "🎬 Movie",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' trailer')}`
      }));

      const taggedBooks = books.map((item) => ({
        title: item.title || "Untitled",
        author: item.author || "",
        year: "",
        image: item.image || "",
        type: "📚 Book",
        url: `https://www.google.com/search?q=${encodeURIComponent(item.title + ' book')}`
      }));

      const taggedMusic = music.map((item) => ({
        title: item.trackName || item.title || "Untitled",
        author: item.artistName || "",
        year: "",
        image: item.artworkUrl100 || "",
        type: "🎵 Music",
        url: item.trackViewUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(item.trackName || item.title)}`
      }));

      const combined = [...taggedMovies, ...taggedBooks, ...taggedMusic];
      const shuffled = combined.sort(() => 0.5 - Math.random()).slice(0, 20);
      setItems(shuffled);
    });
  }, []);

  // ❤️ Toggle like
  const toggleLike = (title) => {
    setLiked((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // 👉 Auto scroll every 3.5 seconds
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: 200,
          behavior: "smooth"
        });
      }
    }, 3500);

    return () => clearInterval(scrollInterval);
  }, []);

 
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" }); // swipe left
    } else if (distance < -50) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" }); // swipe right
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-white text-center mb-4">Recommendations</h3>

      <div
        className="d-flex overflow-auto gap-3 pb-3"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{ flex: "0 0 auto", width: "180px", scrollSnapAlign: "start" }}
          >
            <div className="card bg-dark text-white h-100 position-relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{ height: "250px", background: "#444" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  No Image
                </div>
              )}

              <div
                className="position-absolute top-0 end-0 p-2"
                onClick={(e) => {
                  e.preventDefault();
                  toggleLike(item.title);
                }}
                style={{ fontSize: "1.2rem", zIndex: 2 }}
              >
              </div>

              <div className="card-body p-2">
                <h6 className="card-title mb-1" style={{ fontSize: "0.9rem" }}>
                  {item.title}
                </h6>
                <p className="card-text mb-0" style={{ fontSize: "0.75rem" }}>
                  {item.author ? `By ${item.author}` : item.year}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#ccc" }}>{item.type}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContentCarousel;
