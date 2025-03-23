import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { Text } from "../Text/Text";
import "./Card.css";

const RenderTextSection = ({ value }) => (
  <div className="card-title">
    <Text type="p" className="text secondary">
      {value}
    </Text>
  </div>
);

const Card = ({ project }) => {
  const navigate = useNavigate();

  const handleOpenDetail = () => {
    const path = project.type === 'playground' ? `/playground/${project.slug}` : `/work/${project.slug}`;
    navigate(path, { state: { project } });
  };

  const [props, api] = useSpring(() => ({
    transform: "scale(1)",
    config: { tension: 500, friction: 15 },
  }));

  return (
    <animated.div
      className="card-container"
      style={props}
      onMouseEnter={() => api.start({ transform: "scale(1.01)" })}
      onMouseLeave={() => api.start({ transform: "scale(1)" })}
      onClick={handleOpenDetail}
    >
      <div className="card">
        <div className="card-image-container">
          {project.primaryImage[0] && (
            <animated.img
              src={`.././assets/img/${project.primaryImage[0]}`}
              alt={project.title}
              className="card-image primary"
            />
          )}
          {project.primaryImage[1] && (
            <animated.img
              src={`.././assets/img/${project.primaryImage[1]}`}
              alt={`${project.title} secondary`}
              className="card-image secondary"
            />
          )}
        </div>
        {project.type !== 'playground' && <RenderTextSection value={project.title} />}
      </div>
    </animated.div>
  );
};

export default Card;