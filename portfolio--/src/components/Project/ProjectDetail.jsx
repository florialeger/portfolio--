import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  lazy,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import { useScrollPosition } from "../../context/ScrollPositionContext";
import "./Project.css";
import { Text } from "../ui/Text/Text";
import LoadingAnimation from "../Skeleton/LoadingAnimation/LoadingAnimation"; // Import the LoadingAnimation component

const CrossIcon = lazy(() => import("../ui/Icon/CrossIcon"));

// Utility function to fetch project data
const fetchProjectData = async (slug, type, setProject) => {
  try {
    // Map frontend type to backend endpoint
    const endpoint = type === "work" ? "projects" : "playgrounds";
    const response = await axios.get(
      `http://localhost:5000/${endpoint}/${slug}`
    );
    setProject(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Resource not found at /${type}/${slug}`);
    } else {
      console.error("Error loading project data:", error);
    }
  }
};

// Utility hook for delayed state
const useDelayedState = (initialValue, delay) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => setState(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return state;
};

// Component to render media (image or video)
const RenderMedia = ({ src, alt }) => {
  const isVideo = src.endsWith(".mp4");
  return isVideo ? (
    <animated.video
      key={src}
      src={`../src/assets/img/${src}`}
      alt={alt}
      className="secondary-media"
      autoPlay
      loop
      muted
      preload="metadata"
    />
  ) : (
    <animated.img
      key={src}
      src={`../src/assets/img/${src}`}
      alt={alt}
      className="secondary-media"
      loading="lazy"
    />
  );
};

// Header component for project details
const ProjectDetailHeader = React.memo(
  ({ project, textTrail, showTextTrail, handleCloseDetail, type }) => (
    <div className="project-detail-header">
      <div className="project-detail-header-key">
        {showTextTrail && (
          <>
            <animated.div style={textTrail}>
              <Text type="p" className="text secondary">
                {project.projectDuty}
              </Text>
            </animated.div>
            {type !== "playgrounds" && (
              <animated.div style={textTrail}>
                <Text type="p" className="text h2">
                  {project.title}
                </Text>
              </animated.div>
            )}
            <div style={{ opacity: 0 }}>
              <Text type="p" className="text">
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
              <Text type="p" className="text">
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
  )
);

// Images section for project details
const ProjectDetailImages = ({ project }) => (
  <div className="project-detail-images">
    <div className="secondary-images-grid">
      {project.secondaryImages.map((src, index) => {
        const imageProps = useSpring({
          opacity: 1,
          transform: "translateY(0px)",
          filter: "blur(0px)",
          from: {
            opacity: 0,
            transform: "translateY(-10px)",
            filter: "blur(5px)",
          },
          config: { tension: 200, friction: 40 },
        });
        return (
          <animated.div
            key={index}
            style={imageProps}
            className={
              project.secondaryImages.length === 1 || index % 3 === 2
                ? "full-width"
                : ""
            }
          >
            <RenderMedia src={src} alt={`Secondary ${index}`} />
          </animated.div>
        );
      })}
    </div>
  </div>
);

// Footer section for project details
const ProjectDetailFooter = ({ project }) => (
  <div className="project-detail-footer">
    <Text type="p" className="text ">
      {project.support}
    </Text>
    <Text type="p" className="text">
      {project.created.substring(0, 4)}
    </Text>
  </div>
);

const ProjectDetail = ({ projects }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { scrollPosition, setScrollPosition } = useScrollPosition();
  

  const contentRef = useRef(null);

  const type = useRef(
    location.pathname.includes("work") ? "work" : "playground"
  ).current;

  //Filter and sort projects by type and creation date
  const filteredProjects = projects
    .filter(
      (project) => project.schemaType.toLowerCase() === type.toLowerCase()
    )
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  const [project, setProject] = useState(() => {
    const foundProject = filteredProjects.find((p) => p.slug === slug) || null;
    return foundProject;
  });

  useEffect(() => {
    if (projects.length > 0 && !project) {
      const isValidSlug = projects.some((p) => p.slug === slug);
      if (!isValidSlug) {
        navigate(`/${type}`, { replace: true });
      }
    }
  }, [projects, project, navigate, type, slug]);

  const [loading, setLoading] = useState(!project);

  const memoizedFetchProjectData = useCallback(() => {
    setLoading(true); // Set loading to true before fetching
    fetchProjectData(slug, type, (data) => {
      setProject(data);
      setLoading(false); // Set loading to false after fetching
    });
  }, [slug, type]);

  useEffect(() => {
    if (!project) {
      memoizedFetchProjectData();
    }

    // Restore scroll position
    setTimeout(() => window.scrollTo(0, scrollPosition), 0);

    const saveScrollPosition = () => setScrollPosition(window.scrollY);

    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener("popstate", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("popstate", saveScrollPosition);
    };
  }, [memoizedFetchProjectData, project, scrollPosition, setScrollPosition]);

  const handleCloseDetail = () => {
    setScrollPosition(window.scrollY);
    navigate(`/${type}`);
  };

  setTimeout(() => window.scrollTo(0, scrollPosition), 50);

  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      handleCloseDetail();
    }
  };

  const contentProps = useSpring({
    opacity: project ? 1 : 0,
    transform: project ? "scale(1)" : "scale(0.9)",
    from: { opacity: 0, transform: "scale(0.9)" },
    config: { mass: 1, tension: 280, friction: 30 },
  });

  const textTrail = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    filter: "blur(0px)",
    from: { opacity: 0, transform: "translateY(-10px)", filter: "blur(5px)" },
    config: { tension: 200, friction: 40 },
  });

  const showTextTrail = useDelayedState(false, 200);

  if (!project) return <LoadingAnimation />;

  return (
    <div className="project-detail-overlay" onClick={handleOverlayClick}>
      <animated.div
        className="project-detail-content"
        style={contentProps}
        ref={contentRef}
      >
        <ProjectDetailHeader
          project={project}
          textTrail={textTrail}
          showTextTrail={showTextTrail}
          handleCloseDetail={handleCloseDetail}
          type={type}
        />
        <ProjectDetailImages project={project} />
        <ProjectDetailFooter project={project} />
      </animated.div>
    </div>
  );
};

export default ProjectDetail;
