import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Text } from '../Text/Text';
import './Project.css';

const ProjectList = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="project-list">
      <ul>
        {Array.isArray(projects) && projects.map((project, index) => (
          <li key={project._id} onClick={() => onSelectProject(index)}>
            <Link to={`/work/${project.slug}`}>
              <Text type="span">{project.title}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;