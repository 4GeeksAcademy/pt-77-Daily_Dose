import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSongsByGenre } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PersonalizedContentMusic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [songs, setSongs] = useState([]);
  const state = location.state || {};

  const moodToGenre = {
    Happy: { music: "pop" },
    Sad: { music: "acoustic" },
    Excited: { music: "edm" },
    Tired: { music: "jazz" },
    Bored: { music: "rock" },
    Anxious: { music: "lofi" },
    Relaxed: { music: "hip-hop" }
  };

const handleAddPreferences = (song) => {
  const musicItem = { ...song, type: "music" }; 
  const updated = [...(store.favorites || []), musicItem];
  dispatch({ type: "load_favorites", payload: updated });
  localStorage.setItem("favorites", JSON.stringify(updated));
};


  useEffect(() => {
    if (state.feeling) {
      const genre = moodToGenre[state.feeling]?.music;

      if (!genre) {
        console.warn("No genre found for mood:", state.feeling);
        return;
      }

      getSongsByGenre(genre).then(setSongs);
    }
  }, [state.feeling]);

  return (
    <div
      style={{
        background: 'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4") center/cover no-repeat',
        minHeight: "100vh",
        padding: "20px",
        color: "white"
      }}
    >
      <div className="container text-center">
        <h2 className="mb-4">🎧 Music Recommendations</h2>

        {songs.length > 0 ? (
          <div className="row justify-content-center">
            {songs.map((song) => (
              <div
                key={song.trackId}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <a
                  href={song.trackViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <img
                      src={
                        song.artworkUrl100 ||
                        "https://via.placeholder.com/180?text=No+Image"
                      }
                      className="card-img-top"
                      alt={song.trackName}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div
                      className="card-body d-flex flex-column"
                      style={{ backgroundColor: "white", color: "black" }}
                    >
                      <h5 className="card-title">{song.trackName}</h5>
                      <p className="card-text">Artist: {song.artistName}</p>
                      <p className="card-text">Album: {song.collectionName}</p>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        {song.previewUrl && (
                          <audio controls src={song.previewUrl} style={{ maxWidth: "70%" }} />
                        )}
                        <button
                          className="btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault(); 
                            handleAddPreferences(song);
                          }}
                        >
                          <i className="fa-regular fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No music recommendations found.</p>
        )}

        <button
          className="btn btn-danger mt-4 mb-5"
          onClick={() => navigate("/quiz")}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default PersonalizedContentMusic;
