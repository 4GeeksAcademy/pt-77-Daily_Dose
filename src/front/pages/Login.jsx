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
    <div>
      <div className="Login">Login to DailyDose</div>
    
      <form onSubmit={handleLogin} className=" col-4 text-center mt-5 mb-4 mx-auto bg-dark bg-opacity-75 rounded border">
        <div className="mb-3 mx-5">
          <label htmlFor="email" className="form-label fs-4 text-warning">Email address:</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="name@example.com" 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
          />
        </div>
      <div className="mb-3 mx-5">
          <label htmlFor="password" className="form-label fs-4 text-warning">Password:</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter your password" 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
          />
        </div>
      <button type="submit" className="btn btn-primary mb-3">Login</button>
      </form>

      <div>
        <div className="LoginSpace">
        </div>
      </div>
    </div>  
  );
};
