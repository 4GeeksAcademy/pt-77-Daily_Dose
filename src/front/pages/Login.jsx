import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';
import { login } from '../hooks/actions';

export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, user);
      navigate('/', { state: { justLoggedIn: true } });  // Pass flag to show welcome message
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="text-center mt-5 w-25 mx-auto">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Enter password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="rememberCheck" />
          <label className="form-check-label" htmlFor="rememberCheck">Remember me</label>
        </div>

        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};
