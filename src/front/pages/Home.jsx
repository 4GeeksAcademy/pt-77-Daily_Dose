import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContentCarousel from "../components/ContentCarousel.jsx";
import { useLocation, Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const location = useLocation();

  return (
    <div>
      <div className="d-flex mx-auto justify-content-center">
        {/* <img src="docs/assets/DD Logo.png" style={{height: '100px'}}/> */}
        <div className="DD"> DailyDose</div>
        </div>
      <div className="col-8 text-center mx-auto">
          <div className="border rounded-5 py-4 bg-dark bg-opacity-75">
            <Carousel />
          </div>

        {showWelcome && (
          <div className="alert alert-success">
            Welcome, {store.user?.email || "User"}!
          </div>
        )}

        <div className=" col-4 alert alert-dark mx-auto mt-3">
          {store.message ? (
            <span>{store.message}</span>
          ) : (
            <span className="text-dark fs-5">
            Sign up today and get your Dose of You!
            </span>
          )}
        </div>

        <Link className = "btn btn-lg btn-danger"to="/signup">GET STARTED</Link>
      </div>
    </div>
  );
};
