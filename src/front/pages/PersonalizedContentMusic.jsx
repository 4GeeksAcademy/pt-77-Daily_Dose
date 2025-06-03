import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSongsByGenre } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PersonalizedContentMusic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {store, dispatch} = useGlobalReducer()
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
  const updated = [...(store.favorites || []), song];
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
    <div className="container mt-5 text-center">
      <h2>🎧 Music Recommendations</h2>
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
            </div>
          ))}
        </div>
      ) : (
        <p>No music recommendations found.</p>
      )}

      <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/quiz")}>Retake Quiz</button>
    </div>
  );
};

export default PersonalizedContentMusic;
