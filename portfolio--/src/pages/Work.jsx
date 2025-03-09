import React, { useState, useEffect } from "react";
import { Text } from "../components/Text/Text";
import { FadeIn } from "../hooks/FadeIn";
import ProjectList from "../components/Project/ProjectList";
import ProjectDisplay from "../components/Project/ProjectDisplay";
import axios from "axios";
import './Work.css';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="work-container">
      <div className="work-list-container">
      <FadeIn duration={0.6} delay={0}>
        {" "}
        <Text
          type="h1"
          children={[`My work...`]}
          style={{ marginBottom: "calc(1vw + 16px)" }}
        />
      </FadeIn>
      <ProjectList onSelectProject={setSelectedProjectIndex} />
      </div>
    
      <div className="work-content-container">
       
        {Array.isArray(projects) && projects.length > 0 && (
          <ProjectDisplay project={projects[selectedProjectIndex]} />
        )}
      </div>
    </div>
  );
};

export default Work;
