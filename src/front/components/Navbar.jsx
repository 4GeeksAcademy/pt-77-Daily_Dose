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
    <nav className="navbar navbar-light bg-secondary">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1">
          <img src="/logo.png" style={{ width: "50px" }} />
        </Link>
        <div className="ml-auto d-flex align-items-center">
          {!store.access_token ? (
            <>
              <Link to="/signup">
                <button className="btn btn-light mx-4">Signup</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-light">Login</button>
              </Link>
            </>
          ) : (
            <>
              <span className="me-3 text-light">Hello, {store.user?.first_name || "User"}</span>
              <div className="dropdown">
                <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Profile Page
                </button>
                <ul className="dropdown-menu">

                  <li><Link to="/preferences" className="dropdown-item">My Preferences</Link></li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate("/settings")}>
                      Settings
                    </button>
                  </li>
                  <li><button onClick={handleLogout} className="btn btn-primary text-center d-flex mx-auto mt-3"> <i className="fa-solid fa-right-from-bracket m-2"></i>
                    Log Out
                  </button></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
