import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchBooksByGenre } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PersonalizedContentBook = () => {
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer();
  const [recommendations, setRecommendations] = useState([]);

  const moodActivityMap = {
    Happy: { book: "humor" },
    Sad: { book: "tragedy" },
    Excited: { book: "short stories" },
    Tired: { book: "self-help" },
    Bored: { book: "fantasy" },
    Anxious: { book: "self-help" },
    Relaxed: { book: "romance" }
  };

  const handleAddPreferences = (rec) => {
    const updated = [...store.favorites, rec];
    dispatch({ type: "load_favorites", payload: updated });
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    if (state.feeling && state.activity) {
      const genre = moodActivityMap[state.feeling]?.[state.activity];
      if (!genre) {
        console.warn("No matching genre for:", state.feeling, state.activity);
        return;
      }

      const fetchContent = async () => {
        const bookResults = await fetchBooksByGenre(genre);
        setRecommendations(bookResults);
      };

      fetchContent();
    }
  }, [state.feeling, state.activity]);

  return (
    <div className="container mt-5 text-center">
      <h2>📚 Books Recommendations:</h2>
      {recommendations.length > 0 ? (
        <div className="row justify-content-center mt-5">
          {recommendations.map((rec, index) => (
            <div key={index} className="card m-3" style={{ width: "18rem" }}>
              {rec.image && (
                <img
                  src={rec.image}
                  className="card-img-top"
                  alt={rec.title}
                  style={{ height: "280px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{rec.title}</h5>
                <p className="card-text">Type: {rec.type}</p>
                <p className="card-text">Author: {rec.author}</p>
                <button
                  className="btn btn-outline-danger mt-auto w-50 mx-auto"
                  onClick={() => handleAddPreferences(rec)}
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations found.</p>
      )}
    <button className="btn btn-outline-primary mt-3" onClick={() =>navigate("/quiz")}>Retake Quiz</button>
    </div>
  );
};

export default PersonalizedContentBook;
