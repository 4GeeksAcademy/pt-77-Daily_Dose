import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyPreferences = () => {
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
            <img
              src={fav.image || ""}
              className="card-img-top"
              alt="..."
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                {fav.mood} - {fav.activity}
              </p>
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

export default MyPreferences;
