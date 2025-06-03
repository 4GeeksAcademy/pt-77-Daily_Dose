import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PrivateRoute = ({ children }) => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    if (!store.access_token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [store.access_token]);

  
  if (loading) return null;

  return children;
};

export default PrivateRoute;
