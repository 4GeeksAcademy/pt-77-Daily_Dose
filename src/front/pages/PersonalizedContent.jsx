import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchRecommendations } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PersonalizedContent = () => {
  const location = useLocation();
  const state = location.state || {};
  const {store, dispatch} =useGlobalReducer();
  const [recommendations, setRecommendations] = useState([]);
  
const moodActivityMap = {
  Happy:    { movie: "comedy" },
  Sad:      { movie: "drama" },
  Excited:  { movie: "action" },
  Tired:    { movie: "fantasy" },
  Bored:    { movie: "adventure" },
  Anxious:  { movie: "family" },
  Relaxed:  { movie: "romance" }
};


const handleAddPrefences = (rec) => {
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

      fetchRecommendations(genre).then(setRecommendations);
    }
  }, [state.feeling, state.activity]);

  return (
    <div className="container mt-5 text-center">
      <h2>Mood Recomendations:</h2>

      {recommendations.length > 0 ? (
        <div className="row justify-content-center">
          {recommendations.map((rec, index) => (
            <div className="card mt-5 m-3" key={index} style={{ width: "18rem" }}>
              {rec.poster && (
                <img
                  src={rec.poster}
                  className="card-img-top"
                  alt="Poster"
                  style={{ height: "280px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column flex-grow-1 justify-content-between">
                <h5 className="card-title">{rec.title}</h5>
                <p className="card-text">Type: {rec.type}</p>
                <p className="card-text">Year: {rec.year}</p>
                <button className="btn btn-outline-danger mt-2 w-50 mx-auto" onClick={() =>handleAddPrefences(rec)}><i className="fa-regular fa-heart"></i></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations found.</p>
      )}
    </div>
  );
};

export default PersonalizedContent;
