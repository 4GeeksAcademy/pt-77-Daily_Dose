import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1">
          <img src="/logo.png" style={{width: "50px"}}/>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          {!store.access_token ? (
            <>
              <Link to="/signup">
                <button className="btn btn-primary mx-1">Signup</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-primary mx-1">Login</button>
              </Link>
            </>
          ) : (
            <>
              <span className="me-3">Welcome, {store.user?.email || "User"}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
