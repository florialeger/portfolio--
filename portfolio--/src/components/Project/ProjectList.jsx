import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Text } from '../ui/Text/Text';
import { motion } from 'framer-motion';
import './Project.css';

const DropArrow = ({ width, isActive }) => (
  <motion.img
    src={`/chevron-right.svg`}
    alt={`chevron-right Logo`}
    width={width}
    animate={{ rotate: isActive ? 90 : 0 }}
    transition={{ duration: 0.3 }}
  />
);

const YearHeader = ({ year, isActive, toggleYear }) => (
  <div className={`year-header ${isActive ? 'active' : ''}`} onClick={() => toggleYear(year)}>
    <Text type="span" className="text h2">{year}</Text>
    <DropArrow width={20} isActive={isActive} />
  </div>
);

const ProjectItem = ({ project, isSelected, handleProjectClick, projectRef }) => (
  <motion.li
    key={project._id}
    className={isSelected ? 'active' : ''}
    whileHover={{ translateX: 8 }}
    onClick={() => handleProjectClick(project)}
    ref={projectRef}
  >
    <Text type="span">{project.title}</Text>
  </motion.li>
);

const fetchProjects = async (setYears) => {
  try {
    const response = await axios.get('http://localhost:5000/projects');
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

const ProjectList = ({ selectedProject, onProjectClick }) => {
  const [years, setYears] = useState({});
  const [activeYear, setActiveYear] = useState(null);
  const projectRefs = useRef({});

  useEffect(() => {
    fetchProjects(setYears);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const year = new Date(selectedProject.created).getFullYear();
      setActiveYear(year);
      if (projectRefs.current[selectedProject._id]) {
        projectRefs.current[selectedProject._id].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedProject]);

  const toggleYear = (year) => {
    setActiveYear(activeYear === year ? null : year);
  };

  return (
    <div className="project-list">
      {Object.keys(years).sort((a, b) => b - a).map(year => (
        <div key={year}>
          <YearHeader year={year} isActive={activeYear === year} toggleYear={toggleYear} />
          {activeYear === year && (
            <ul className="project-items">
              {years[year].map(project => (
                <ProjectItem
                  key={project._id}
                  project={project}
                  isSelected={selectedProject && selectedProject._id === project._id}
                  handleProjectClick={onProjectClick}
                  projectRef={el => projectRefs.current[project._id] = el}
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