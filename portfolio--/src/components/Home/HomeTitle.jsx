// This file defines the HomeTitle component, 
// showcasing UX design and illustration roles with interactive animations and hover effects.
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import useSpringEnter from "@hooks/useSpringEnter.jsx";
import useMagneticEffect from "@hooks/useMagneticEffect.jsx";
import { Text } from "@ui/Text.jsx";
import home1 from "@assets/img/home-1.png";
import home2 from "@assets/img/home-2.png";
import home3 from "@assets/img/home-3.png";
import home4 from "@assets/img/home-4.png";
import "./HomeTitle.css";

const images = [
  { src: home1, type: "ux" },
  { src: home2, type: "illustration" },
  { src: home3, type: "ux" },
  { src: home4, type: "illustration" },
];

const AndIcon = ({ color, size }) => (
  <svg
    viewBox="0 0 1156 1330"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color, width: size, height: size }}
  >
    <path
      d="M1047.07 556.537C956.082 1120.04 485.535 1245.63 256.582 1135.05C47.4647 1034.05 35.5851 752.552 407.574 556.537C865.083 413.552 696.285 113.802 494.577 110.041C308.437 106.57 130.083 324.051 407.574 556.539L1047.07 1255.05"
      stroke="currentColor"
      strokeWidth="220"
    />
  </svg>
);

const HomeTitle = () => {
  const controls = useSpringEnter();
  const [hoveredType, setHoveredType] = useState(null);
  const containerRef = useRef(null);
  const imageRefs = images.map(() => useRef(null));
  const [positions, setHoveredIndex] = useMagneticEffect(
    containerRef,
    imageRefs
  );

  // This function sets the hovered type and index when 
  // the user hovers over an image, enabling interactive effects.
  const handleMouseEnter = (index, type) => {
    setHoveredType(type);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredType(null);
    setHoveredIndex(null);
  };

  return (
    <motion.div
      className="home-title-container"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      ref={containerRef}
    >
      {/* This section renders a container with interactive images. */}
      {/* Each image reacts to hover events, applying a magnetic effect with transformations, scaling, and grayscale filters. */}
      {/* Hovered images are highlighted by adjusting opacity, grayscale, and z-index for emphasis. */}
      <div className="home-images-container">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image.src}
            alt={`home-${index + 1}`}
            className={`home-image ${image.type}`}
            onMouseEnter={() => handleMouseEnter(index, image.type)}
            onMouseLeave={handleMouseLeave}
            // This inline style dynamically adjusts the appearance and position of each image based on user interactions:
            // `transform`: Moves the image using `translate` and scales it based on the magnetic effect positions.
            // `filter`: Applies a grayscale filter to non-hovered images when a specific type is hovered.
            // `opacity`: Reduces the opacity of non-hovered images to emphasize the hovered type.
            // `zIndex`: Brings the hovered image to the front by increasing its z-index.
            style={{
              transform: `translate(${positions[index]?.x || 0}px, ${
                positions[index]?.y || 0
              }px) scale(${positions[index]?.scale || 1})`,
              filter:
                hoveredType && hoveredType !== image.type
                  ? "grayscale(100%)"
                  : "none",
              opacity: hoveredType && hoveredType !== image.type ? "0.5" : "1",
              zIndex: hoveredType && hoveredType === image.type ? 10 : 1, // Bring hovered image to front
            }}
            ref={imageRefs[index]}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
      <div className="home-text-container">
        <Text
          type="h1"
          className="home-title text h1"
          style={{
            color:
              hoveredType === "illustration"
                ? "var(--textDefault)"
                : "var(--textTertiary)",
          }}
        >
          ILLUSTRATOR
        </Text>

        <AndIcon color="var(--textTertiary)" size="var(--font-size-headline)" />

        <Text
          type="h1"
          className="home-title text h1"
          style={{
            color:
              hoveredType === "ux"
                ? "var(--textDefault)"
                : "var(--textTertiary)",
          }}
        >
          UX DESIGNER
        </Text>
      </div>
    </motion.div>
  );
};

export default HomeTitle;
