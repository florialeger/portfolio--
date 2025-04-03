import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollPosition } from "@context/ScrollPositionContext";
import { Text } from "@ui/Text";
import "./Card.css";

const CardImage = React.memo(({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
));

const CardImageContainer = React.memo(({ primaryImage, title }) => (
  <div className="card-image-container">
    {primaryImage?.[0] && (
      <CardImage
        src={`.././assets/img/${primaryImage[0]}`}
        alt={`${title} primary`}
        className="card-image primary"
      />
    )}
    {primaryImage?.[1] && (
      <CardImage
        src={`.././assets/img/${primaryImage[1]}`}
        alt={`${title} secondary`}
        className="card-image secondary"
      />
    )}
  </div>
));

const RenderTextSection = React.memo(({ value }) => (
  <div className="card-title">
    <Text type="p" className="text button">
      {value}
    </Text>
  </div>
));

// Main Card Component
const Card = React.memo(({ project }) => {
  const navigate = useNavigate();
  const { setScrollPosition } = useScrollPosition();

  const handleOpenDetail = useCallback(() => {
    const currentScrollPosition = window.scrollY; // Save the scroll position of the parent page
    setScrollPosition(currentScrollPosition);

    const path =
      project.schemaType === "playground"
        ? `/playground/${project.slug}`
        : `/work/${project.slug}`;

    navigate(path, { state: { project } }); // Pass the project data via state
  }, [navigate, project, setScrollPosition]);

  return (
    <div className="card-container" onClick={handleOpenDetail}>
      <CardImageContainer
        primaryImage={project.primaryImage}
        title={project.title}
      />
      {project.schemaType !== "playground" && (
        <RenderTextSection value={project.title} />
      )}
    </div>
  );
});

export default Card;