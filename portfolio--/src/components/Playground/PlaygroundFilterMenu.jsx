import React, { useState, useRef, memo } from "react";
import { motion } from "framer-motion";
import { AllIcon, UxIcon, IllustIcon } from "../ui/Icon/NavIcons"; // Import icons
import "./PlaygroundFilterMenu.css";

const BackgroundSlider = memo(({ activeIndex, linkRefs, hoveredIndex }) => {
  const activeLinkRef =
    linkRefs[hoveredIndex !== null ? hoveredIndex : activeIndex]?.current;

  return (
    <motion.div
      className="background-slider-playground"
      initial={{ x: 0, width: 0 }}
      animate={{
        x: activeLinkRef ? activeLinkRef.offsetLeft : 0,
        width: activeLinkRef ? activeLinkRef.offsetWidth : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        background: "var(--backgroundMain)",
        backdropFilter: "blur(24px)",
        border: "1.5px solid var(--backgroundNavReduced)",
        boxShadow: "var(--shadows--mini)",
      }}
    />
  );
});

const PlaygroundFilterMenu = ({ currentFilter, setFilter }) => {
  const filters = ["ALL", "UX", "ILLUST"];
  const icons = {
    ALL: AllIcon,
    UX: UxIcon,
    ILLUST: IllustIcon,
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const linkRefs = filters.map(() => useRef(null));
  const activeIndex = filters.indexOf(currentFilter);

  return (
    <div className="playground-filter-menu">
      <BackgroundSlider
        activeIndex={activeIndex}
        linkRefs={linkRefs}
        hoveredIndex={hoveredIndex}
      />
      <ul className="filter-options">
        {filters.map((filter, index) => {
          const IconComponent = icons[filter]; // Dynamically select the icon
          const isHovered = hoveredIndex === index;
          const isActive = currentFilter === filter;

          return (
            <li
              key={filter}
              ref={linkRefs[index]}
              className={`filter-option ${isActive ? "active" : ""}`}
              onClick={() => setFilter(filter)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <IconComponent
                hovered={isHovered || isActive} // Pass hovered or active state
                color={isActive ? "var(--textDefault)" : isHovered ?  "var(--textDefault)" : "var(--textSecondary)"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlaygroundFilterMenu;