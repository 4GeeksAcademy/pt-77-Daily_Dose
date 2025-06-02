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
  }
};

  return (
    <div className="container mt-5 text-center mx-auto w-50">
      <h2>Take this Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <label htmlFor="feeling" className="form-label">
            How are you feeling today?
          </label>
          <input
            type="text"
            id="feeling"
            className="form-control"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="e.g. Happy, Tired, Anxious, Sad, Excited, Bored, Anxious, Relaxed "
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Choose what your mind feels like doing:
          </label>
          <select
            className="form-select"
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

        <button type="submit" className="btn btn-primary">
          Recommendations
        </button>
      </form>
    </div>
  );
};

export default Quiz;
