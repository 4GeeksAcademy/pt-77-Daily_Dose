import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PersonalizedContent = () => {
    const { store, dispatch } = useGlobalReducer();
    const { state } = useLocation();
    const navigate = useNavigate();

    const renderRecommendation = () => {
        switch (state?.activity) {

            case "movie":
                return (
                    <>
                        <p>We recommend a relaxing movie</p>
                        <div className="card m-auto" style={{ width: "18rem" }}>
                            <img src="https://m.media-amazon.com/images/M/MV5BNTBiYjg1ZGYtZjQxZS00NDBkLTgyZjEtZGIzYWNmNjhiOGRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" className="card-img-top" alt="..." style={{ height: "250px" }} />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => dispatch({
                                            type: "add_favorite",
                                            payload: {
                                                mood: state?.feeling,
                                                activity: state?.activity,
                                                image: "https://m.media-amazon.com/images/M/MV5BNTBiYjg1ZGYtZjQxZS00NDBkLTgyZjEtZGIzYWNmNjhiOGRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                                               
                                            }
                                        })}
                                    >
                                        <i className="fa-regular fa-heart btn-outline-danger"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case "music":
                return (
                    <>
                        <p>Try this chill playlist</p>
                        <div className="card m-auto" style={{ width: "18rem" }}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ITY6Q6mgy9kVYtw8wpidWdYweJh8wVzQew&s" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => dispatch({
                                            type: "add_favorite",
                                            payload: {
                                                mood: state.feeling,
                                                activity: state.activity,
                                                image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ITY6Q6mgy9kVYtw8wpidWdYweJh8wVzQew&s"

                                            }
                                        })}
                                    >
                                        <i className="fa-regular fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>;
                    </>
                )
            case "book":
                return (
                    <>
                        <p>How about reading this book</p>
                        <div className="card m-auto" style={{ width: "18rem" }}>
                            <img src="https://images-platform.99static.com//ZqZwG4pQDume_nl-uK78UqqRsfE=/359x102:1191x934/fit-in/500x500/99designs-contests-attachments/112/112787/attachment_112787713" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            dispatch({
                                                type: "add_favorite",
                                                payload: {
                                                    mood: state.feeling,
                                                    activity: state.activity,
                                                    image:"https://images-platform.99static.com//ZqZwG4pQDume_nl-uK78UqqRsfE=/359x102:1191x934/fit-in/500x500/99designs-contests-attachments/112/112787/attachment_112787713"
                                                }
                                            })
                                        }
                                    >
                                        <i className="fa-regular fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>;
                    </>
                )
            default:
                return <p>Take a moment for yourself</p>;
        }
    };

    return (
        <div className="container mt-5 text-center w-25 m-auto">
            <h1 className="fw-bold" style={{ fontFamily: "Tagesschrift" }}> Welcome, {store.user?.first_name} {store.user?.last_name}</h1>
            <p className="mt-5 fw-bold">We Recomended you</p>
            <p>Mood: <strong>{state?.feeling}</strong></p>
            {renderRecommendation()}
            <button className="btn btn-info mt-3" onClick={() => navigate("/quiz")}> Retake Quiz
            </button>
        </div>
    );
};

export default PersonalizedContent;