import React, { StrictMode, useState, useEffect, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { themes } from "@assets/styles/theme.jsx";
import { ScrollPositionProvider } from "@context/ScrollPositionContext.jsx";
import useScrollRestoration from "@hooks/useScrollRestoration.jsx";
import "@/index.css";
import "@/App.css";

import {
  LoadingAnimation,
  LoadingAnimationWithoutComplete,
} from "@components/skeleton/LoadingAnimation.jsx";

// Lazy load main components
const App = lazy(() => import("./App.jsx"));
const Navigation = lazy(() => import("@components/skeleton/Navigation.jsx"));
const ThemeSwitcher = lazy(() =>
  import("@components/skeleton/ThemeSwitcher.jsx")
);
const LoadingScreen = lazy(() =>
  import("@components/skeleton/LoadingScreen.jsx")
);

// Wrapper component for scroll restoration
const ScrollRestorationWrapper = ({ children }) => {
  useScrollRestoration();
  return children;
};

function Main() {
  const [theme, setTheme] = useState("white");
  const [isLoadingScreenActive, setIsLoadingScreenActive] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isLoadingAnimationActive, setIsLoadingAnimationActive] =
    useState(false);
  const [projects, setProjects] = useState([]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  // Fetch data
  useEffect(() => {
    const fetchAllItems = async () => {
      setIsFetchingData(true);
      setIsLoadingAnimationActive(true);
      try {
        const response = await axios.get("http://localhost:5000/all-items");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setProjects([]);
      } finally {
        setTimeout(() => {
          setIsFetchingData(false);
        }, 1200); // Ensure LoadingAnimation lasts for at least 1.2 seconds
        setTimeout(() => {
          setIsLoadingAnimationActive(false);
        }, 1200); // Ensure LoadingAnimation is visible for 1.2 seconds
      }
    };

    fetchAllItems();
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <ScrollPositionProvider>
          <ScrollRestorationWrapper>
            <Suspense fallback={<LoadingAnimationWithoutComplete />}>
              {isLoadingScreenActive ? (
                <LoadingScreen
                  onFinished={() => setIsLoadingScreenActive(false)}
                />
              ) : isFetchingData || isLoadingAnimationActive ? (
                <div className="App app-loading">
                  <LoadingAnimation onComplete={() => {}} />
                </div>
              ) : (
                <>
                  <App projects={projects} />
                  <Navigation />
                  <ThemeSwitcher
                    currentTheme={theme}
                    setCurrentTheme={setTheme}
                    setTheme={setTheme}
                  />
                </>
              )}
            </Suspense>
          </ScrollRestorationWrapper>
        </ScrollPositionProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
