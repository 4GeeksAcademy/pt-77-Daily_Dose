import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Settings = () => {
  const [store, dispatch] = useGlobalReducer();
  const navigate = useNavigate();

  const handleClearPreferences = () => {
    dispatch({ type: "load_favorites", payload: [] });
    localStorage.removeItem("favorites");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    dispatch({ type: "set_user", payload: { user: null, access_token: null } });
    navigate("/login");
  };

  const handleRetakeQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="container text-center mt-5">
      <h2>Settings</h2>
      <div className="card p-4 mt-4">
        <p><strong>Name:</strong> {store.user?.first_name || "Guest"}</p>
        <p><strong>Email:</strong> {store.user?.email || "example@email.com"}</p>

        <button className="btn btn-warning my-2" onClick={handleRetakeQuiz}>
          Retake Quiz
        </button>
        <br />
        <button className="btn btn-danger my-2" onClick={handleClearPreferences}>
          Clear All Preferences
        </button>
        <br />
        <button className="btn btn-secondary mt-2" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
