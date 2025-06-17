import React, { useEffect, useState } from "react";
import {
  fetchRecommendations,
  fetchBooksByGenre,
  getSongsByGenre
} from "../hooks/actions";

const genres = ["happy", "action", "pop", "romance", "mystery", "rock"];

const ContentCarousel = () => {
  const [items, setItems] = useState([]);

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

  return (
    <div className="container mt-5">
      <h3 className="text-white text-center mb-4">Recommendations</h3>

      <div className="carousel-track">
        <div className="carousel-items d-flex gap-3">
          {[...items, ...items].map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ flex: "0 0 auto", width: "180px" }}
            >
              <div
                className="card bg-dark text-white h-100"
                style={{ minWidth: "180px" }}
              >
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
    </div>
  );
};

export default ContentCarousel;