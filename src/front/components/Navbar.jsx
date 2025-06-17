import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";


const Navbar = () => {
  const { store, dispatch, getUser } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

useEffect(() => {
  if (store.access_token && (!store.user || !store.user.first_name)) {
    getUser();
  }
}, [store.access_token]);

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 ">
          <img src="docs/assets/DD Logo.png" style={{ width: "70px" }} />
        </Link>
        <div className="ml-auto d-flex align-items-center">
          {!store.access_token ? (
            <>
              <Link to="/signup">
                <button className="btn btn-outline-light mx-4">Sign up</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-light">Log in</button>
              </Link>
            </>
          ) : (
            <>
          
              <span className="me-3 text-light">Hello, {store.user?.first_name || "User"}</span>
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Profile Page
                </button>
                <ul className="dropdown-menu bg-dark">
                  <li>
                    <a className="dropdown-item text-info" href="/quiz"><i className="fa-solid fa-circle-question m-2"></i>New Quiz</a>
                  </li>
                  <li className="dropdown-item text-info">
                    <i className="fa-solid fa-heart m-2"></i>
                    <Link to="/preferences-book" className="m-1 text-info" style={{color: 'black', textDecoration: 'none'}}>Books</Link>|
                    <Link to="/preferences-movie" className="m-1 text-info" style={{color: 'black', textDecoration: 'none'}}>Movies</Link>|
                    <Link to="/preferences-music" className="m-1 text-info" style={{color: 'black', textDecoration: 'none'}}>Music</Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-info" onClick={() => navigate("/settings")}>
                      <i className="fa-solid fa-gear m-2"></i> Settings
                    </button>
                  </li>
                  <li><a onClick={handleLogout} className="dropdown-item fw-bold text-info"> <i className="fa-solid fa-right-from-bracket m-2"></i>
                    Log Out
                  </a></li>
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
