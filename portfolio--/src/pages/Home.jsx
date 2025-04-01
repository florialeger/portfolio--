import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import HomeTitle from "../components/Home/HomeTitle";
import HomePresentation from "../components/Home/HomePresentation";
import { LoadingAnimationWithoutComplete } from "../components/Skeleton/LoadingAnimation/LoadingAnimation";

import "./Pages.css";

const sections = ["HomeTitle", "HomePresentation", "LoadingAnimation"];

function Home() {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // Prevent rapid scrolling

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => setProjects(response.data.slice(0, 3))) // Display first 3 projects
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling) return; // Prevent handling scroll if already scrolling

      if (event.deltaY > 0 && index < sections.length - 1) {
        setIndex(index + 1);
      } else if (event.deltaY < 0 && index > 0) {
        setIndex(index - 1);
      }

      setIsScrolling(true); // Set scrolling state to true
      setTimeout(() => setIsScrolling(false), 500); // Allow scrolling again after 500ms
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [index, isScrolling]);

  return (
    <div className="home-container">
      <motion.div
        initial={{ y: "0vh" }}
        animate={{ y: `-${index * 100}vh` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="home-sections-wrapper"
      >
        <div className="home-section">
          <HomeTitle />
        </div>
        <div className="home-section">
          <HomePresentation />
        </div>
        <div className="home-section">
          <LoadingAnimationWithoutComplete />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
