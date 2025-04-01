import React, { Suspense, lazy } from "react"; // Removed useState, useEffect
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Removed axios import - no longer needed here
// Import the specific loading animation needed for Suspense fallback
import LoadingAnimation from "./components/Skeleton/LoadingAnimation/LoadingAnimation"; // Use the version that expects onComplete
import "./App.css";

// Keep the lazy loading for page components
const Home = lazy(() => import(/* webpackPrefetch: true */ "./pages/Home"));
const Work = lazy(() => import(/* webpackPrefetch: true */ "./pages/Work"));
const Playground = lazy(() => import("./pages/Playground"));
const About = lazy(() => import("./pages/About"));
const ProjectDetail = lazy(() => import("./components/Project/ProjectDetail"));

// App now receives projects as a prop and assumes it's ready
function App({ projects }) {
  const location = useLocation();
  // Removed isFetchingData state and useEffect for data fetching

  // --- Render the main app structure ---
  // No initial loading check needed here anymore, as main.jsx handles it.
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {/*
          Inner Suspense:
          Handles lazy loading of the individual PAGE components (Home, Work, etc.).
          Uses the standard LoadingAnimation as fallback while page code loads.
        */}
        <Suspense fallback={<LoadingAnimation onComplete={() => {}} />}>
          <Routes location={location} key={location.pathname}>
            {/* Removed loading check wrapper */}
            <Route path="/" element={<Home />} />
            {/* Pass projects data down - guaranteed to be available */}
            <Route path="/work" element={<Work projects={projects} />} />
            <Route
              path="/work/:slug"
              element={<ProjectDetail projects={projects} type="work" />}
            />
            <Route
              path="/playground"
              element={<Playground projects={projects} />} // projects is ready
            />
            <Route
              path="/playground/:slug"
              element={<ProjectDetail projects={projects} type="playground" />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default App;