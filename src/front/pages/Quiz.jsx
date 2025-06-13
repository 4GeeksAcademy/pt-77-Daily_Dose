import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [feeling, setFeeling] = useState("");
  const [activity, setActivity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const state = { feeling, activity };

    if (activity === "book") {
      navigate("/personalized-book", { state });
    } else if (activity === "movie") {
      navigate("/personalized-movie", { state });
    } else if (activity === "music") {
      navigate("/personalized-music", { state });
    }
  };

  return (
    <div
      style={{
        background: 'url("/guitar.png") center/cover no-repeat',
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 bg-dark text-white p-4 rounded shadow-lg">
            <h2 className="text-center mb-4">Take This Quiz</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="feeling" className="form-label">
                  How are you feeling today?
                </label>
                <input
                  type="text"
                  id="feeling"
                  className="form-control"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  placeholder="e.g. Happy, Tired, Anxious, Sad, Relaxed"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="activity" className="form-label">
                  Choose what your mind feels like doing:
                </label>
                <select
                  className="form-select"
                  id="activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="movie">Watch a Movie</option>
                  <option value="music">Listen to Music</option>
                  <option value="book">Read a Book</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success w-100 mt-3">
                Get Recommendations
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
