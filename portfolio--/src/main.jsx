import { scan } from "react-scan";
import { StrictMode, useState, useEffect, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { themes } from "./assets/styles/theme.jsx";
import "./index.css";

const App = lazy(() => import("./App.jsx"));
const Navigation = lazy(() => import("./components/Skeleton/Navigation/Navigation.jsx"));
const ThemeSwitcher = lazy(() => import("./components/Skeleton/ThemeSwitcher/ThemeSwitcher.jsx"));
const LoadingScreen = lazy(() => import("./components/Skeleton/LoadingScreen/LoadingScreen.jsx"));

scan({
  enabled: true,
});

function Main() {
  const [theme, setTheme] = useState("white");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          {loading ? (
            <LoadingScreen setLoading={setLoading} />
          ) : (
            <>
              <App />
              <Navigation />
              <ThemeSwitcher currentTheme={theme} setCurrentTheme={setTheme} setTheme={setTheme} />
            </>
          )}
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);