import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Layout = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch({ type: "load_favorites", payload: storedFavorites });
  }, []);

  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;
