import React, { Suspense, lazy } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoadingAnimation } from "@components/skeleton/LoadingAnimation/LoadingAnimation.jsx"; 
import "@/App.css";

const Home = lazy(() => import(/* webpackPrefetch: true */ "@pages/Home"));
const Work = lazy(() => import(/* webpackPrefetch: true */ "@pages/Work"));
const Playground = lazy(() => import("@pages/Playground"));
const About = lazy(() => import("@pages/About"));
import NotFound from "@pages/NotFound"; // Import the NotFound page

const ProjectDetail = lazy(() => import("@components/projects/ProjectDetail"));

function App({ projects }) {
  const location = useLocation();
   return (
     <div className="App">
       <AnimatePresence mode="wait">
         <Suspense fallback={<LoadingAnimation onComplete={() => {}} />}>
           <Routes location={location} key={location.pathname}>
             <Route path="/" element={<Home />} />
             <Route path="/work" element={<Work projects={projects} />} />
             <Route
               path="/work/:slug"
               element={<ProjectDetail projects={projects} type="work" />}
             />
             <Route
               path="/playground"
               element={<Playground projects={projects} />}
             />
             <Route
               path="/playground/:slug"
               element={<ProjectDetail projects={projects} type="playground" />}
             />
             <Route path="/about" element={<About />} />
             <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
           </Routes>
         </Suspense>
       </AnimatePresence>
     </div>
   );
}

export default App;