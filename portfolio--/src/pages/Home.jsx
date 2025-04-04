import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeTitle from "@components/Home/HomeTitle.jsx";
import HomePresentation from "@components/Home/HomePresentation.jsx";
import Footer from "@components/Skeleton/Footer.jsx";

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
