import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Prevent React Router from resetting scroll
    window.history.scrollRestoration = "manual";
  }, [location]);

  return null;
};

export default useScrollRestoration;
