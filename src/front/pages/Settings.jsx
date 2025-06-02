import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Settings = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const updatedUser = { password };
    const success = await updateUser(dispatch, store, updatedUser);
    if (success) {
      setPassword("");
      setIsEditing(false);
    }
  };

  const handleClearPreferences = () => {
    dispatch({ type: "load_favorites", payload: [] });
    localStorage.setItem("favorites", JSON.stringify([]));
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
      <h2 className="mb-3">Settings</h2>
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <strong>Password:</strong>
        </div>

        {isEditing ? (
          <>
            <input
              className="form-control mt-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button className="btn btn-success mt-2 me-2" onClick={handleSave} disabled={!password.trim()}>
              Save
            </button>
            <button className="btn btn-secondary mt-2" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-link mt-2" onClick={() => setIsEditing(true)}>
            Change Password
          </button>
        )}

        <p className="mt-4">
          <strong>Email:</strong> {store.user?.email || "example@mail.com"}
        </p>

        <button className="btn btn-warning mt-3" onClick={handleRetakeQuiz}>
          Retake Quiz
        </button>

        <button className="btn btn-danger mt-2" onClick={handleClearPreferences}>
          Clear All Preferences
        </button>

        <button className="btn btn-secondary mt-2" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
