// This file defines the Card component, displaying project/ playgrounds details with images and navigation to detailed views on click.

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollPosition } from "@context/ScrollPositionContext.jsx";
import { Text } from "@ui/Text.jsx";
import "./Card.css";

const CardImage = React.memo(({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
));

const CardImageContainer = React.memo(({ primaryImage, title }) => (
  <div className="card-image-container">
    {primaryImage?.[0] && (
      <CardImage
        src={`/assets/img/${primaryImage[0]}`}
        alt={`${title} primary`}
        className="card-image primary"
      />
    )}
    {primaryImage?.[1] && (
      <CardImage
        src={`/assets/img/${primaryImage[1]}`}
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
    // Save the current scroll position of the parent page. This is critical for restoring the scroll position when navigating back.
    const currentScrollPosition = window.scrollY;

    // Use the `setScrollPosition` function from the `ScrollPositionContext` to store the scroll position globally.
    setScrollPosition(currentScrollPosition);

    const path =
      project.schemaType === "playground"
        ? `/playground/${project.slug}` // Navigate to the playground detail page if the project is a playground.
        : `/work/${project.slug}`; // Otherwise, navigate to the work detail page.

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
