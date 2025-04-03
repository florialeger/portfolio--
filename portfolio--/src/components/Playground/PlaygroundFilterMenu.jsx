import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { AllIcon, UxIcon, IllustIcon } from "@ui/icon/NavIcon";
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
        background: "var(--colorPrimary0)",
        backdropFilter: "blur(24px)",
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
  const [isVisible, setIsVisible] = useState(true);
  const linkRefs = filters.map(() => useRef(null));
  const activeIndex = filters.indexOf(currentFilter);

  useEffect(() => {
    const handleResizeAndScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportWidth = window.innerWidth;

      // Hide the menu if the viewport width is less than 680px
      if (viewportWidth < 680) {
        setIsVisible(false);
        return;
      }

      // Check if the user has scrolled past the last 100vh
      if (scrollPosition + viewportHeight >= documentHeight - viewportHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleResizeAndScroll);
    window.addEventListener("resize", handleResizeAndScroll);

    return () => {
      window.removeEventListener("scroll", handleResizeAndScroll);
      window.removeEventListener("resize", handleResizeAndScroll);
    };
  }, []);

  return (
    <div
      className={`playground-filter-menu ${isVisible ? "visible" : "hidden"}`}
    >
      <BackgroundSlider
        activeIndex={activeIndex}
        linkRefs={linkRefs}
        hoveredIndex={hoveredIndex}
      />
      <ul className="filter-options">
        {filters.map((filter, index) => {
          const IconComponent = icons[filter];
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
                color={
                  isActive
                    ? "var(--textDefault)"
                    : isHovered
                    ? "var(--textDefault)"
                    : "var(--textSecondary)"
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlaygroundFilterMenu;
