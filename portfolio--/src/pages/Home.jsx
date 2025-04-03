import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import HomeTitle from "@components/Home/HomeTitle";
import HomePresentation from "@components/Home/HomePresentation";
import Footer from "@components/skeleton/Footer";

import "./Pages.css";


function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => setProjects(response.data.slice(0, 3))) // Display first 3 projects
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="home-container">
    
        <div className="home-section">
          <HomeTitle />
        </div>
        <div className="home-section">
          <HomePresentation />
        </div>
        <div className="home-section">
          <Footer />
        </div>
     
    </div>
  );
}

export default Home;
