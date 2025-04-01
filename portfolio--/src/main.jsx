import React, { StrictMode, useState, useEffect, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios"; // Import axios here
import { themes } from "./assets/styles/theme.jsx";
import { ScrollPositionProvider } from "./context/ScrollPositionContext";
import "./index.css";
import "./App.css"; // Import App.css for potential .app-loading class

// Import the specific loading animations needed
import { LoadingAnimationWithoutComplete } from "./components/Skeleton/LoadingAnimation/LoadingAnimation.jsx"; // Infinite loop version
import LoadingAnimation from "./components/Skeleton/LoadingAnimation/LoadingAnimation.jsx"; // Version with onComplete

// Lazy load main components
const App = lazy(() => import("./App.jsx"));
const Navigation = lazy(() =>
  import("./components/Skeleton/Navigation/Navigation.jsx")
);
const ThemeSwitcher = lazy(() =>
  import("./components/Skeleton/ThemeSwitcher/ThemeSwitcher.jsx")
);
const LoadingScreen = lazy(() =>
  import("./components/Skeleton/LoadingScreen/LoadingScreen.jsx")
);

// react-scan initialization (keep as is if needed)
import { scan } from "react-scan";
scan({ enabled: true });

function Main() {
  const [theme, setTheme] = useState("white");
  // State Management Refactor:
  const [isLoadingScreenActive, setIsLoadingScreenActive] = useState(true); // Tracks if LoadingScreen is running
  const [isFetchingData, setIsFetchingData] = useState(true); // Tracks if data is being fetched
  const [isLoadingAnimationActive, setIsLoadingAnimationActive] =
    useState(false); // Tracks if LoadingAnimation is active
  const [projects, setProjects] = useState([]); // Stores the fetched data

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
      setIsLoadingAnimationActive(true); // Activate LoadingAnimation
      try {
        const response = await axios.get("http://localhost:5000/all-items");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setProjects([]);
      } finally {
        setTimeout(() => {
          setIsFetchingData(false); // Mark data fetching as complete
        }, 1200); // Ensure LoadingAnimation lasts for at least 1.2 seconds
        setTimeout(() => {
          setIsLoadingAnimationActive(false); // Deactivate LoadingAnimation
        }, 1200); // Ensure LoadingAnimation is visible for 1.2 seconds
      }
    };

    fetchAllItems();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <StrictMode>
      <BrowserRouter>
        <ScrollPositionProvider>
          <Suspense fallback={<LoadingAnimationWithoutComplete />}>
            {isLoadingScreenActive ? (
              <LoadingScreen onFinished={() => setIsLoadingScreenActive(false)} />
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
        </ScrollPositionProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
createRoot(document.getElementById("root")).render(<Main />);
