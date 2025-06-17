import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyMoviePreferences = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (indexToRemove) => {
    const updatedFavorites = store.favorites.filter((_, i) => i !== indexToRemove);
    dispatch({ type: "load_favorites", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const movieFavorites = store.favorites.filter(
    (fav) => fav.type?.toLowerCase() === "movie"
  );

  return (
    <div
      style={{
        background: 'url("/movie.png") center/cover no-repeat',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <div className="container text-white text-center">
        <h2 className="mb-4">🎥 My Movie Preferences</h2>

        <div className="row justify-content-center">
          {movieFavorites.length > 0 ? (
            movieFavorites.map((fav, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card bg-dark text-white h-100 shadow">
                  {fav.poster ? (
                    <img
                      src={fav.poster}
                      alt={fav.title}
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
                    <h5 className="card-title">{fav.title}</h5>
                    <p className="card-text"><strong>Type:</strong> Movie</p>
                    <p className="card-text"><strong>Year:</strong> {fav.year || "Unknown"}</p>
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
            <p className="text-light">No movie preferences saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMoviePreferences;
