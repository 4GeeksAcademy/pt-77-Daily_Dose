// === Login.jsx ===
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
    navigate("/quiz", { state: { justLoggedIn: true } });
  };

  return (
    <form onSubmit={handleLogin} className="text-center mt-5 w-25 m-auto">
       <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="name@example.com" 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
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
          />
        </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};
