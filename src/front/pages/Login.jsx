import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../hooks/actions";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(dispatch, user);
    navigate("/", { state: { justLoggedIn: true } });
  };

  return (
    <div
      style={{
        background: 'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4") center/cover no-repeat',
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4 bg-dark text-white p-4 rounded shadow-lg">
            <h2 className="text-center mb-4">Log in</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
