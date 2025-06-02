import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Settings = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(store.user?.first_name || "");
  const [lastName, setLastName] = useState(store.user?.last_name || "");
  const [email, setEmail] = useState(store.user?.email || "");
  const [isEditing, setIsEditing] = useState(false);

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

const handleSave = async () => {
  const updatedUser = {
    first_name: firstName,
    last_name: lastName,
    email: email
  };

  const success = await updateUser(dispatch, store, updatedUser);
  if (success) {
    setIsEditing(false);
  }
};


  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Settings</h2>
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <strong>Name:  </strong>
          {isEditing ? (
            <>
              <input
                className="form-control mt-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                className="form-control mt-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
               <input
                className="form-control mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button className="btn btn-success btn-sm mt-2 me-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary btn-sm mt-2" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {firstName} {lastName}
              <button className="btn btn-link btn-sm ms-2" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </>
          )}
        </div>

        <p><strong>Email:</strong> {store.user?.email || "example@email.com"}</p>

        <button className="btn btn-warning w-100 my-2" onClick={handleRetakeQuiz}>
          Retake Quiz
        </button>

        <button className="btn btn-danger w-100 my-2" onClick={handleClearPreferences}>
          Clear All Preferences
        </button>

        <button className="btn btn-secondary w-100 my-2" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
