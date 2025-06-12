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
    Anxious: { music: "hip-hop" },
    Relaxed: { music: "lofi" }
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
    <div className="container border rounded border-light mt-5 text-center w-75 bg-dark bg-opacity-75">
      <div className="fs-1 text-warning">🎧 Music Recommendations</div>
      {songs.length > 0 ? (
        <div className="row justify-content-center">
          {songs.map((song) => (
            <div className="card m-3 mt-5" key={song.trackId} style={{ width: "18rem" }}>
              <img src={song.artworkUrl100} className="card-img-top" alt={song.trackName} style={{ height: "180px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{song.trackName}</h5>
                <p className="card-text">Artist: {song.artistName}</p>
                <p className="card-text">Album: {song.collectionName}</p>
                <div className="d-flex align-items-center justify-content-between">
                <audio controls src={song.previewUrl} className="" />
                <button className="btn btn-outline-danger ms-5 " onClick={() =>handleAddPreferences(song)}><i className="fa-regular fa-heart"></i></button>
                </div>
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
