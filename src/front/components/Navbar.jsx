import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { use } from "react";

const Navbar = () => {
  const { store, dispatch, getUser } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  useEffect(() => {
    if(!store.user?.first_name){
      getUser()
    }
  },[])

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
                   <li>
                   <a className="dropdown-item" href="/quiz"><i className="fa-solid fa-circle-question m-2"></i>New Quiz</a>
                    </li>
                  <li><Link to="/preferences" className="dropdown-item"><i className="fa-solid fa-heart m-2"></i>My Preferences </Link></li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate("/settings")}>
                     <i class="fa-solid fa-gear m-2"></i> Settings
                    </button>
                  </li>
                  <li><a onClick={handleLogout} className="dropdown-item fw-bold"> <i className="fa-solid fa-right-from-bracket m-2"></i>
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
