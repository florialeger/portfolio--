import React, { useState, useRef, useEffect } from "react";
import { themes } from "../styles/theme";
import wheel from "../assets/wheel.svg";
import "./ThemeSwitcher.css";

export default function ThemeSwitcher({ setTheme }) {
  const [currentTheme, setCurrentTheme] = useState("white");
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const themeSwitcherRef = useRef(null);

  const themeKeys = Object.keys(themes);
  const otherThemes = themeKeys.filter((t) => t !== currentTheme);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setTheme(theme);
    setIsOpen(false); // Close the animation after selecting a theme
    setIsHovered(false); // Stop the magnetic effect
  };

  const toggleOpen = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
    setIsOpen(!isOpen);
  };

  const openOnMouseEnter = () => {
    setIsOpen(true);
    setIsHovered(true);
  };

  const closeOnMouseLeave = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered && themeSwitcherRef.current) {
        const rect = themeSwitcherRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        themeSwitcherRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        themeSwitcherRef.current.style.transition = "transform 0.5s ease"; // Add transition for smooth effect
      } else if (themeSwitcherRef.current) {
        themeSwitcherRef.current.style.transform = `translate(0, 0)`;
        themeSwitcherRef.current.style.transition = "transform 0.5s ease"; // Add transition for smooth effect
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div
      ref={themeSwitcherRef}
      className={`theme-switcher ${isOpen ? "open" : ""}`}
      onClick={toggleOpen}
      onMouseEnter={openOnMouseEnter}
      onMouseLeave={closeOnMouseLeave}
    >
      <img src={wheel} alt="Color Wheel" className="color-wheel" />

      {otherThemes.map((theme, index) => (
        <div
          key={theme}
          className="theme-circle"
          style={{
            backgroundColor: themes[theme].background,
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
            handleThemeChange(theme);
          }}
        />
      ))}
    </div>
  );
}