import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import "./Project.css";
import { Text } from "../ui/Text/Text";

const CrossIcon = lazy(() => import("../ui/CrossIcon/CrossIcon"));

const fetchProjectData = async (slug, type, setProject) => {
  try {
    const response = await axios.get(`http://localhost:5000/${type}/${slug}`);
    const projectData = response.data;
    setProject(projectData);
  } catch (error) {
    console.error("Error loading project data:", error);
  }
};

const useDelayedState = (initialValue, delay) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return state;
};

const RenderMedia = ({ src, alt }) => {
  const isVideo = src.endsWith('.mp4');
  return isVideo ? (
    <animated.video
      key={src}
      src={`../src/assets/img/${src}`}
      alt={alt}
      className="secondary-media"
      autoPlay
      loop
      muted
    />
  ) : (
    <animated.img
      key={src}
      src={`../src/assets/img/${src}`}
      alt={alt}
      className="secondary-media"
    />
  );
};

const ProjectDetailHeader = ({ project, textTrail, showTextTrail, handleCloseDetail }) => (
  <div className="project-detail-header">
    <div className="project-detail-header-key">
      {showTextTrail && (
        <>
          <animated.div style={textTrail}>
            <Text type="p" className="text secondary">
              {project.projectDuty}
            </Text>
          </animated.div>
          <animated.div style={textTrail}>
            <Text type="p" className="text h2">
              {project.title}
            </Text>
          </animated.div>
          <div style={{ opacity: 0 }}>
            <Text type="p" className="text secondary">
              {project.projectDuty}
            </Text>
          </div>
        </>
      )}
    </div>
    <div className="project-detail-header-main">
      {showTextTrail && (
        <>
          <animated.div style={textTrail}>
            <Text type="p" className="text secondary">
              {project.context}
            </Text>
          </animated.div>
        </>
      )}
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <CrossIcon onClick={handleCloseDetail} />
    </Suspense>
  </div>
);

const ProjectDetailImages = ({ project }) => (
  <div className="project-detail-images">
    <div className="secondary-images-grid">
      {project.secondaryImages.map((src, index) => {
        const imageProps = useSpring({
          opacity: 1,
          transform: "translateY(0px)",
          filter: "blur(0px)",
          from: { opacity: 0, transform: "translateY(-10px)", filter: "blur(5px)" },
          config: { tension: 200, friction: 40, easing: "cubic-bezier(.43,.45,.62,.95)" },
        });
        return (
          <animated.div key={index} style={imageProps} className={project.secondaryImages.length === 1 || index % 3 === 2 ? "full-width" : ""}>
            <RenderMedia src={src} alt={`Secondary ${index}`} />
          </animated.div>
        );
      })}
    </div>
  </div>
);

const ProjectDetailFooter = ({ project }) => (
  <div className="project-detail-footer">
    <Text type="p" className="text secondary">
      {project.support}
    </Text>
    <Text type="p" className="text secondary">
      {project.created}
    </Text>
  </div>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(location.state?.project || null);
  const contentRef = useRef(null);

  const type = location.pathname.includes("playground") ? "playgrounds" : "projects";

  const memoizedFetchProjectData = useCallback(() => {
    fetchProjectData(slug, type, setProject);
  }, [slug, type]);

  useEffect(() => {
    if (!project) {
      memoizedFetchProjectData();
    }
  }, [memoizedFetchProjectData, project]);

  const handleCloseDetail = () => {
    navigate(-1);
  };

  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      handleCloseDetail();
    }
  };

  const contentProps = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 200, friction: 35, easing: "cubic-bezier(.43,.45,.62,.95)" },
  });

  const textTrail = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    filter: "blur(0px)",
    from: { opacity: 0, transform: "translateY(-10px)", filter: "blur(5px)" },
    config: { tension: 200, friction: 40, easing: "cubic-bezier(.43,.45,.62,.95)" },
  });

  const showTextTrail = useDelayedState(false, 200); // Delay of 200ms for text

  if (!project) return null;

  return (
    <div className="project-detail-overlay" onClick={handleOverlayClick}>
      <animated.div
        className="project-detail-content"
        style={contentProps}
        ref={contentRef}
      >
        <ProjectDetailHeader project={project} textTrail={textTrail} showTextTrail={showTextTrail} handleCloseDetail={handleCloseDetail} />
        <ProjectDetailImages project={project} />
        <ProjectDetailFooter project={project} />
      </animated.div>
    </div>
  );
};

export default ProjectDetail;