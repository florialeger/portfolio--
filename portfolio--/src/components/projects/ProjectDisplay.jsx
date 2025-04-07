// This file defines the ProjectDisplay component,
//  showcasing a list of projects with vertical scrolling and interactive animations.

import React, { useState, useEffect, useRef, useCallback, lazy } from "react";
import ProjectList from "./ProjectList.jsx";
import "./Project.css";
import { BounceInView } from "@hooks/useBounceInView.jsx";
import { motion } from "framer-motion";

const Card = lazy(() => import("@ui/Card"));

const ProjectDisplay = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const projectCardRefs = useRef({});

  useEffect(() => {
    // Sort projects by creation date (most recent first)
    const sorted = [...projects].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    setSortedProjects(sorted);
  }, [projects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleScroll = useCallback(
    (event) => {
      if (isScrolling) return;

      if (event.deltaY > 0 && index < projects.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
        setIsScrolling(true);
      } else if (event.deltaY < 0 && index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
        setIsScrolling(true);
      }
    },
    [index, projects.length, isScrolling]
  );

  useEffect(() => {
    const debouncedScroll = (event) => {
      handleScroll(event);
    };

    window.addEventListener("wheel", debouncedScroll);
    return () => window.removeEventListener("wheel", debouncedScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Duration should match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

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
        <motion.div
          initial={{ y: "0vh" }}
          animate={{ y: `-${index * 100}vh` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="sections-wrapper"
        >
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="project-card"
              ref={(el) => {
                projectCardRefs.current[project._id] = el;
              }}
            >
              <BounceInView>
                <Card project={project} />
              </BounceInView>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
