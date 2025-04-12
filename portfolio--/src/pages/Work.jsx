// This file defines the Work page, displaying a filtered list of work
// projects with interactive components.

import React, { useMemo } from "react";
import ProjectDisplay from "@components/projects/ProjectDisplay.jsx";
import "@pages/Pages.css";

const Work = ({ projects }) => {
  const workProjects = useMemo(() => {
    // Ensure projects is an array
    return Array.isArray(projects)
      ? projects.filter((item) => item.schemaType === "project")
      : [];
  }, [projects]);

  return (
    <>
      <div className="work-container">
        {workProjects.length > 0 ? (
          <ProjectDisplay projects={workProjects} />
        ) : (
          <p>No work projects available.</p>
        )}
      </div>
    </>
  );
};

export default Work;
