import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyMusicPreferences = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (indexToRemove) => {
    const updatedFavorites = store.favorites.filter((_, i) => i !== indexToRemove);
    dispatch({ type: "load_favorites", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const musicFavorites = store.favorites.filter(
    (fav) => fav.type?.toLowerCase() === "music"
  );

  return (
    <div
      style={{
        background: 'url("/music.png") center/cover no-repeat',
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <div className="container text-white text-center">
        <h2 className="mb-4">🎧 My Music Preferences</h2>

        <div className="row justify-content-center">
          {musicFavorites.length > 0 ? (
            musicFavorites.map((song, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card bg-dark text-white h-100 shadow">
                  {song.artworkUrl100 ? (
                    <img
                      src={song.artworkUrl100}
                      alt={song.trackName}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "250px", backgroundColor: "#444" }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{song.trackName}</h5>
                    <p className="card-text"><strong>Artist:</strong> {song.artistName}</p>
                    <p className="card-text"><strong>Album:</strong> {song.collectionName}</p>
                    {song.previewUrl && (
                      <audio controls src={song.previewUrl} className="w-100 mb-2" />
                    )}
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-light">No music preferences saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMusicPreferences;
