import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import { useLocation, Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 3000);
    }
  }, [location.state]);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <p className="lead">
        <img
          src="/rigo-baby.jpg"
          className="img-fluid rounded-circle mb-3"
          alt="Rigo Baby"
        />
      </p>

      {showWelcome && (
        <div className="alert alert-success">
          Welcome, {store.user?.email || "User"}!
        </div>
      )}

      <div className="alert alert-info">
        {store.message ? (
          <span>{store.message}</span>
        ) : (
          <span className="text-danger">
           Welcome to Daily Dose 
          </span>
        )}
      </div>

      <Link className = "btn btn-danger"to="/signup">GET STARTED</Link>
    </div>
  );
};
