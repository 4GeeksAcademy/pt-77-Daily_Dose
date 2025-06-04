import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContentCarousel from "../components/ContentCarousel.jsx";
import { useLocation, Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const location = useLocation();

  return (
    <div
      style={{
        background: 'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4") center/cover no-repeat',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div className="container text-center mt-5">
        <h1 className="display-4 fw-bold">Welcome to Daily Dose</h1>
        <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
          Your personalized source for music, books, and more — tailored to your mood and interests.
        </p>
    <div className="text-center mt-5">

        {store.user ? (
          <>
            <h4 className="mt-4" style={{ fontFamily: "'Satisfy', cursive" }}>
              Hello, {store.user.first_name || store.user.email}!{" "}
              <a className="quiz-bounce text-light mt-4 d-block" href="/quiz">
                Click To Find Your Daily Dose ❓
              </a>
            </h4>
            <div className="mt-4">
              <ContentCarousel />
            </div>
          </>
        ) : (
          <Link to="/signup" className="btn btn-light btn-lg mt-5">
            GET STARTED
          </Link>
        )}
      </div>
    </div>
  );
};
