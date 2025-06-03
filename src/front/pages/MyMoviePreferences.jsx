import React from "react";
import  useGlobalReducer  from "../hooks/useGlobalReducer";

const MyMoviePreferences = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (indexToRemove) => {
    const updatedFavorites = store.favorites.filter((_, i) => i !== indexToRemove);
    dispatch({ type: "load_favorites", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container text-center mt-5">
      <h2>My Preferences</h2>
      <div className="row justify-content-center">
        {store.favorites.map((fav, index) => (
          <div key={index} className="card m-3" style={{ width: "18rem" }}>
            {fav.poster && (
              <img
                src={fav.poster}
                alt={fav.title}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{fav.title}</h5>
              <p className="card-text"><strong>Type:</strong> movie</p>
              <p className="card-text"><strong>Year:</strong> {fav.year || "Unknown"}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMoviePreferences;
