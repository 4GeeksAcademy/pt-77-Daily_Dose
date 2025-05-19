import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { useNavigate } from 'react-router-dom';
import { signup } from '../hooks/actions.js';



export const Signup = () => {
  const { store, dispatch } = useGlobalReducer();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", password: ""});

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(dispatch, user);
    navigate("/");
  };

  return (
    <div className="text-center mt-5 w-25 m-auto">
      <form onSubmit={handleSignup}>
        
        <div className="mb-3">
          <label htmlFor="text" className="form-label">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="FirstName" 
            placeholder="First name" 
            onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="LastName" 
            placeholder="Last name" 
            onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
          />
        </div>

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

        <div className="form-check mb-3">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="termsCheck" 
          />
          <label className="form-check-label" htmlFor="termsCheck">
            I agree to the <a href="#">Terms of Service</a>
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};
