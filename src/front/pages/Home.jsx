import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContentCarousel from "../components/ContentCarousel.jsx";
import { useLocation, Link } from "react-router-dom";

export const Home = () => {
  const { store } = useGlobalReducer();
  const location = useLocation();

  return (
    <div
      className="w-100"
      style={{
        background: 'url("/guitar.png") center/cover no-repeat',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        overflowX: 'hidden',
      }}
    >
      <div
        className="container-fluid text-center mt-5"
        style={{ maxWidth: "1200px" }}
      >
        <h1 className="display-4 fw-bold">Welcome to Daily Dose</h1>
        <p className="lead mx-auto" style={{ maxWidth: "600px" }}>
          Your personalized source for music, books, and more — tailored to
          your mood and interests.
        </p>

        {store.user ? (
          <>
            <h4 className="mt-4" style={{ fontFamily: "'Satisfy', cursive" }}>
              Hello, {store.user.first_name || store.user.email}!{" "}
              <a
                className="quiz-bounce text-light mt-3 d-block"
                href="/quiz"
              >
                Click To Find Your Daily Dose ❓
              </a>
            </h4>

            <div className="container px-3 mt-4">
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
