import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import { useScrollPosition } from "@context/ScrollPositionContext.jsx";
import "./Project.css";
import { Text } from "@ui/Text.jsx";
import { LoadingAnimation } from "@components/Skeleton/LoadingAnimation.jsx";
import { CrossIcon } from "@ui/icon/SignIcon.jsx";


// Utility function to fetch project data
const fetchProjectData = async (slug, type, setProject) => {
  try {
    const endpoint = type === "work" ? "projects" : "playgrounds";
    const response = await axios.get(
      `/.netlify/functions/server/${endpoint}/${slug}`
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
      src={`/assets/img/${src}`}
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
      src={`/assets/img/${src}`}
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
            {type !== "playground" && (
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
      {project.created}
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
    // Fetch project data if not already loaded
    if (!project) {
      memoizedFetchProjectData();
    }

    // Restore scroll position after the component mounts
    const restoreScroll = () => {
      window.scrollTo(0, scrollPosition); // Restore the scroll position of the parent page
    };

    setTimeout(restoreScroll, 150); // Delay to ensure DOM is ready

    // Save scroll position on specific events
    const saveScrollPosition = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);
    };

    // Add event listeners for saving scroll position
    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener("popstate", saveScrollPosition);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("popstate", saveScrollPosition);
    };
  }, [memoizedFetchProjectData, project, scrollPosition, setScrollPosition]);

  const handleCloseDetail = () => {
    // Navigate back to the parent page
    navigate(`/${type}`);

    // Restore the scroll position after navigation
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 100);
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
        <CrossIcon onClick={handleCloseDetail} />
    </div>
  );
};

export default ProjectDetail;
