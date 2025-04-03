import React, { useMemo } from "react";
import ProjectDisplay from "@components/projects/ProjectDisplay";
import "@pages/Pages.css";

const Work = ({ projects }) => {
  const workProjects = useMemo(() => {
    return projects.filter((item) => item.schemaType === "project");
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
