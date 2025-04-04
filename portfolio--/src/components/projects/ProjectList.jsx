import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Text } from "@ui/Text.jsx";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@ui/icon/SignIcon.jsx";
import "./Project.css";

const DropArrow = ({ width, isActive, color }) => (
  <motion.div
    animate={{ rotate: isActive ? 90 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <ChevronRightIcon width={width} color={color} />
  </motion.div>
);

const YearHeader = ({ year, isActive, toggleYear }) => (
  <div
    className={`year-header ${isActive ? "active" : ""}`}
    onClick={() => toggleYear(year)}
  >
    <Text type="span" className="text button">
      {year}
    </Text>
    <DropArrow
      width={20}
      isActive={isActive}
      color={isActive ? "var(--textPrimary)" : "var(--textSecondary)"}
    />
  </div>
);

const ProjectItem = ({
  project,
  isSelected,
  handleProjectClick,
  projectRef,
}) => (
  <motion.li
    key={project._id}
    className={isSelected ? "active" : ""}
    whileHover={{ translateX: 8 }}
    onClick={(e) => {
      e.stopPropagation(); // Prevent event propagation
      handleProjectClick(project); // Navigate to the project detail page
    }}
    ref={projectRef}
  >
    <Text type="p" className="text">
      {project.title}
    </Text>
  </motion.li>
);

const fetchProjects = async (setYears) => {
  try {
    const response = await axios.get("http://localhost:5000/projects");
    const projectsByYear = response.data.reduce((acc, project) => {
      const year = new Date(project.created).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(project);
      return acc;
    }, {});
    setYears(projectsByYear);
  } catch (error) {
    console.error(error);
  }
};

const ProjectList = ({ projects, selectedProject, onProjectClick }) => {
  const [years, setYears] = useState({});
  const [activeYear, setActiveYear] = useState(null);
  const projectRefs = useRef({});

  useEffect(() => {
    fetchProjects(setYears);
  }, []);

  useEffect(() => {
    const projectsByYear = projects.reduce((acc, project) => {
      const year = new Date(project.created).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(project);
      return acc;
    }, {});

    setYears(projectsByYear);
  }, [projects]);

  const toggleYear = (year) => {
    setActiveYear(activeYear === year ? null : year);
  };

  return (
    <div className="project-list">
   {Object.keys(years)
  .sort((a, b) => b - a) // Sort years in descending order
  .map((year) => (
    <div key={year}>
      <YearHeader
        year={year}
        isActive={activeYear === year}
        toggleYear={toggleYear}
      />
      {activeYear === year && (
        <ul className="project-items">
          {years[year]
            .slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => new Date(b.created) - new Date(a.created)) // Sort projects by date
            .map((project) => (
              <ProjectItem
                key={project._id}
                project={project}
                isSelected={
                  selectedProject && selectedProject._id === project._id
                }
                handleProjectClick={onProjectClick}
                projectRef={(el) =>
                  (projectRefs.current[project._id] = el)
                }
              />
            ))}
        </ul>
      )}
    </div>
  ))}
    </div>
  );
};

export default ProjectList;
