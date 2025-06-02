import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyBookPreferences = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (indexToRemove) => {
    const updatedFavorites = store.favorites.filter((_, i) => i !== indexToRemove);
    dispatch({ type: "load_favorites", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const bookFavorites = store.favorites.filter(fav => fav.type === "book");

  return (
    <div className="container text-center mt-5">
      <h2>My Preferences:</h2>
      <div className="row justify-content-center mt-5">
        {bookFavorites.map((fav, index) => (
          <div key={index} className="card m-3" style={{ width: "18rem" }}>
            {(fav.poster || fav.image) && (
              <img
                src={fav.poster || fav.image}
                alt={fav.title}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
            )}
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{fav.title}</h5>
              <p className="card-text"><strong>Type:</strong> {fav.type || "Unknown"}</p>
              <p className="card-text">
                <strong>Author:</strong> {fav.author || "Unknown"}<br/>
              </p>
              <button className="btn btn-danger mt-auto" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookPreferences;
