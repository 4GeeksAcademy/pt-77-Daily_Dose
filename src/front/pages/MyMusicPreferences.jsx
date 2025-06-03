import React from "react";
import  useGlobalReducer  from "../hooks/useGlobalReducer";

const MyMusicPreferences = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (indexToRemove) => {
    const updatedFavorites = store.favorites.filter((_, i) => i !== indexToRemove);
    dispatch({ type: "load_favorites", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container text-center mt-5">
      <h2>🎧 My Music Preferences</h2>
      <div className="row justify-content-center">
        {store.favorites.map((song, index) => (
          <div key={index} className="card m-3" style={{ width: "18rem" }}>
            <img
              src={song.artworkUrl100}
              alt={song.trackName}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{song.trackName}</h5>
              <p className="card-text"><strong>Artist:</strong> {song.artistName}</p>
              <p className="card-text"><strong>Album:</strong> {song.collectionName}</p>
              <audio controls src={song.previewUrl} className="w-100 mb-2" />
              <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMusicPreferences;
