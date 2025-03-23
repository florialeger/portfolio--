import { useState, useRef } from "react";
import useThemeMotion from "../../../hooks/useThemeMotion";
import { themes } from "../../../assets/styles/theme";
import wheel from "../../../assets/svg/wheel.svg";
import "./ThemeSwitcher.css";

const ThemeCircle = ({ theme, handleThemeChange }) => {
  return (
    <div
      className="theme-circle"
      style={{ backgroundColor: themes[theme].backgroundTheme }}
      onClick={(e) => {
        e.stopPropagation();
        handleThemeChange(theme);
      }}
    />
  );
};

const getRandomTheme = (currentTheme) => {
  const availableThemes = Object.keys(themes).filter((t) => t !== currentTheme);
  const randomIndex = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomIndex];
};

const ThemeSwitcher = ({ currentTheme, setCurrentTheme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const themeSwitcherRef = useRef(null);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setTheme(theme);
    setIsOpen(false);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (isOpen) {
      const randomTheme = getRandomTheme(currentTheme);
      handleThemeChange(randomTheme);
    } else {
      setIsOpen(true);
    }
  };

  useThemeMotion(isHovered, themeSwitcherRef);

  return (
    <div
      ref={themeSwitcherRef}
      className={`theme-switcher ${isOpen ? "open" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsOpen(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setIsHovered(false);
      }}
    >
      <img src={wheel} alt="Color Wheel" className="color-wheel" />
      {Object.keys(themes)
        .filter((t) => t !== currentTheme)
        .map((theme) => (
          <ThemeCircle key={theme} theme={theme} handleThemeChange={handleThemeChange} />
        ))}
    </div>
  );
};

export default ThemeSwitcher;