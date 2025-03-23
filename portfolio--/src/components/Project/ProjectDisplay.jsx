import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProjectList from "./ProjectList";
import Card from "../ui/Card/Card";
import "./Project.css";
import { BounceInView } from "../../hooks/useBounceInView";

const ProjectDisplay = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectCardRefs = useRef({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        const sortedProjects = response.data.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        setProjects(sortedProjects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject && projectCardRefs.current[selectedProject._id]) {
      projectCardRefs.current[selectedProject._id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedProject]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="project-display-container">
      <div className="project-list-container">
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          onProjectClick={handleProjectClick}
        />
      </div>

      <div className="vertical-project-display-container">
        <div className="project-cards-container">
          {projects.map((project) => (
            <div
              key={project._id}
              className="project-card"
              ref={(el) => (projectCardRefs.current[project._id] = el)}
            >
              <BounceInView>
                <Card project={project} />
              </BounceInView>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
