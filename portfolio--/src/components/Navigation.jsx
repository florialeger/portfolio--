import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navigation.css";

export default function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [hovered, setHovered] = useState(null);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  return (
    <nav className="Navigation">
      {/* Linear Blur Overlay */}
      <div className={`blur-overlay ${isNavOpen ? "active" : ""}`} />

      <div className={`nav-container ${isNavOpen ? "active" : ""}`}>
        <ul className="nav-links nav-left">
          <li className={`nav-link ${isActive("/") ? "active" : ""}`}>
            <Link to="/" onClick={closeNav} className="home">
              Floria Leger
            </Link>
          </li>
        </ul>
        <ul className="nav-links nav-right">
          <li className="nav-link menu-icon" onClick={toggleNav}>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </li>
          {isNavOpen && (
            <div className="menu">
              {["/work", "/playground", "/about"].map((path) => (
                <li
                  key={path}
                  className={`nav-link ${isActive(path) ? "active" : ""}`}
                  onClick={toggleNav}
                >
                  <Link to={path}>
                    {path.replace("/", "").toUpperCase()}
                  </Link>
                </li>
              ))}
            </div>
          )}
          {["/work", "/playground", "/about"].map((path) => (
            <li
              key={path}
              className={`nav-link ${isActive(path) ? "active" : ""}`}
              onMouseEnter={() => setHovered(path)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link to={path}>{path.replace("/", "").toUpperCase()}</Link>
              <motion.div className="arrow">
                <motion.div
                  className="long-arrow-line arrow-line"
                  animate={{
                    rotate: hovered === path ? -45 : 0,
                  }}
                  transition={{ duration: 0.1, ease: "anticipate" }}
                />
                <motion.div
                  className="short-arrow-line arrow-line"
                  animate={{
                    rotate: hovered === path ? 0 : 0,
                    x: hovered === path ? 1 : 0,
                    y: hovered === path ? -6 : 0,
                    height: hovered === path ? 2.25 : 1.5,
                  }}
                  transition={{ duration: 0.1, ease: "anticipate" }}
                />
                <motion.div
                  className="short-arrow-line arrow-line"
                  animate={{
                    rotate: hovered === path ? 90 : 0,
                    x: hovered === path ? 6 : 0,
                    y: hovered === path ? -1 : 0,
                    height: hovered === path ? 2.25 : 1.5,
                  }}
                  transition={{ duration: 0.1, ease: "anticipate" }}
                />
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}