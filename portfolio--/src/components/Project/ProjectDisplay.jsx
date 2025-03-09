import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Text } from "../Text/Text";
import "./Project.css";

const renderTextSection = (label, value) => (
  <>
    <Text type="p" className="text.key-info">
      {label}
    </Text>
    <Text type="p" className="text.date">
      {value}
    </Text>
  </>
);

const ProjectDisplay = ({ project }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (project && project.imageUrl) {
      const imagePath = `.././assets/img/${project.imageUrl}`;
      setImageUrl(imagePath);
    }
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      className="project-display"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/work/${project.slug}`} className="project-display-container">
        <div className="project-top-infos">
          <div className="project-top-infos-left">
            {renderTextSection("Context", project.context)}
          </div>
          <div className="project-top-infos-right">
            {renderTextSection("Created", project.created)}
            {renderTextSection("Project Duty", project.projectDuty)}
          </div>
        </div>
          {imageUrl && <img src={imageUrl} alt={project.title} />}
        <div className="project-bottom-infos">
          {renderTextSection("Support", project.support)}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectDisplay;