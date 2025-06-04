import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Favorites = () => {
    const { store, dispatch } = useGlobalReducer()

     return (
        <div className="text-center mt-5"></div>
    );
}; 