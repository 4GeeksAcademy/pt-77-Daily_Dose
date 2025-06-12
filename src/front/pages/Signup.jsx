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
    navigate("/login");
  };

  return (
    <div className>
      <div className="Login">SignUp Now!</div>
      <div className="col-3 text-center mt-5 mx-auto border rounded bg-dark bg-opacity-75">
        <form onSubmit={handleSignup}>
          
          <div className="d-flex mx-auto mt-3">
            <div className="mx-auto">
            <label htmlFor="text" className="form-label text-light">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="FirstName" 
              placeholder="First name" 
              onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
            />
            </div>

            <div className="mx-auto">
            <label htmlFor="text" className="form-label text-light">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="LastName" 
              placeholder="Last name" 
              onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
            />
            </div>
          </div>

          <div className="mx-auto p-3">
            <label htmlFor="email" className="form-label text-light">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="name@example.com" 
              onChange={(e) => setUser({ ...user, email: e.target.value })} 
            />
          </div>

          <div className="mb-3 mx-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Enter your password" 
              onChange={(e) => setUser({ ...user, password: e.target.value })} 
            />
          </div>

          <div className="form-check d-flex mx-auto justify-content-center ">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="termsCheck" 
            />
            <label className="form-check-label text-light ms-2" htmlFor="termsCheck">
              I agree to the <a href="#">Terms of Service</a>
            </label>
          </div>

          <button type="submit" className="btn btn-primary mb-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
