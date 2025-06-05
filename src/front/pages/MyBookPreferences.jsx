import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyBookPreferences = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (indexToRemove) => {
    const updatedFavorites = store.favorites.filter((_, i) => i !== indexToRemove);
    dispatch({ type: "load_favorites", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const bookFavorites = store.favorites.filter(fav => fav.type?.toLowerCase() === "book");

  return (
    <div
      style={{
        background: 'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4") center/cover no-repeat',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <div className="container text-white text-center">
        <h2 className="mb-4">📚 My Book Preferences</h2>

        <div className="row justify-content-center">
          {bookFavorites.length > 0 ? (
            bookFavorites.map((fav, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 bg-dark text-white shadow">
                  {(fav.poster || fav.image) ? (
                    <img
                      src={fav.poster || fav.image}
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
                    <p className="card-text"><strong>Type:</strong> {fav.type || "Unknown"}</p>
                    <p className="card-text"><strong>Author:</strong> {fav.author || "Unknown"}</p>
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
            <p className="text-light">No book preferences saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookPreferences;
