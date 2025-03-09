import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Squircle } from "corner-smoothing";
import "./Navigation.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Playground", path: "/playground" },
  { name: "About", path: "/about" },
];

const BlurOverlay = ({ isReduced }) => {
  return (
    <div
      className={`blur-overlay ${!isReduced ? "active" : ""}`}
      style={{
        opacity: !isReduced ? 1 : 0,
        backdropFilter: !isReduced ? "blur(20px)" : "blur(0px)",
      }}
    />
  );
};

function BackgroundSlider({ activeIndex, linkRefs, hoveredIndex }) {
  const activeLinkRef =
    linkRefs[hoveredIndex !== null ? hoveredIndex : activeIndex]?.current;

  return (
    <motion.div
      className="background-slider"
      initial={{ x: 0, width: 0 }}
      animate={{
        x: activeLinkRef ? activeLinkRef.offsetLeft : 0,
        width: activeLinkRef ? activeLinkRef.offsetWidth : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ background: "var(--backgroundNavLinks)" }}
    />
  );
}

function Arrow({ path, hovered }) {
  return (
    <motion.div
      className="arrow"
      animate={{
        rotate: hovered === path ? -225 : 0,
        height: hovered === path ? 3.2 : 2.2,
      }}
      transition={{ duration: 0.5, ease: "anticipate" }}
    />
  );
}

const NavLink = ({ path, isActive, hovered, setHovered, refProp, index, setHoveredIndex }) => (
  <li
    className={`nav-link ${isActive(path) ? "active" : ""}`}
    onMouseEnter={() => {
      setHovered(path);
      setHoveredIndex(index);
    }}
    onMouseLeave={() => {
      setHovered(null);
      setHoveredIndex(null);
    }}
    ref={refProp}
  >
    <Link to={path} className="nav-link-content">
      {path.replace("/", "").toUpperCase()}
      <Arrow path={path} hovered={hovered} />
    </Link>
  </li>
);


const NavHome = ({ isActive, closeNav }) => {
  return (
    <ul className="nav-links nav-left">
      <li className={`nav-link ${isActive("/") ? "active" : ""}`}>
        <Link to="/" onClick={closeNav} className="home">
          Floria Leger
        </Link>
      </li>
    </ul>
  );
};



const NavRightLinks = ({ isActive, hovered, setHovered }) => {
  const location = useLocation();
  const activePath = location.pathname;
  const linkRefs = navItems.slice(1).map(() => useRef(null));
  const activeIndex = navItems
    .slice(1)
    .findIndex((item) => item.path === activePath);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="nav-links-container">
      <BackgroundSlider
        activeIndex={activeIndex}
        linkRefs={linkRefs}
        hoveredIndex={hoveredIndex}
      />
      <ul className="nav-links nav-right">
        {["/work", "/playground", "/about"].map((path, index) => (
          <NavLink
            key={path}
            path={path}
            isActive={isActive}
            hovered={hovered}
            setHovered={setHovered}
            refProp={linkRefs[index]}
            index={index}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </ul>
    </div>
  );
};

const MenuIcon = ({ toggleNav, isNavOpen }) => {
  const styleDefault = "var(--gray-300)";
  const styleActive = "var(--colorPrimary0)";

  return (
    <div className="menu-icon" onClick={toggleNav}>
      <motion.div
        className="menu-icon-bar"
        style={{
          background: isNavOpen ? styleActive : styleDefault,
        }}
        animate={{
          y: isNavOpen ? 7 : 1,
          rotate: isNavOpen ? 45 : 4,
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className="menu-icon-bar"
        style={{
          background: isNavOpen ? styleActive : styleDefault,
        }}
        initial={{ opacity: 0 }}
        animate={{
          rotate: isNavOpen ? -50 : -5,
          y: isNavOpen ? 1 : 0,
          opacity: isNavOpen ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className="menu-icon-bar"
        style={{
          background: isNavOpen ? styleActive : styleDefault,
        }}
        animate={{
          y: isNavOpen ? -6 : -1,
          rotate: isNavOpen ? -50 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

const MenuButton = ({ toggleNav, isNavOpen, currentPage }) => {
  const currentItem = navItems.find((item) => item.path === currentPage);
  const menuText = currentItem ? currentItem.name.toUpperCase() : "MENU";

  return (
    <Squircle
      cornerRadius={20}
      cornerSmoothing={0.6}
      borderWidth={1}
      style={{
        background: isNavOpen ? "var(--button-navbar-reduced)" : "transparent",

        color: isNavOpen ? "var(--colorPrimary0)" : "var(--gray-300)",
      }}
    >
      <div className="menu-button" onClick={toggleNav}>
        <div
          className={`menu-text ${
            currentPage !== "/" ? "menu-text-active" : ""
          }`}
          children={[menuText]}
        />

        <MenuIcon toggleNav={toggleNav} isNavOpen={isNavOpen} />
      </div>
    </Squircle>
  );
};

const MenuDropDown = ({ toggleNav, currentPage }) => {
  return (
    <Squircle
      cornerRadius={24}
      cornerSmoothing={0.6}
      className="menu-dropdown-container"
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`menu-item ${currentPage === item.path ? "active" : ""}`}
          onClick={toggleNav}
        >
          {item.name}
        </Link>
      ))}
    </Squircle>
  );
};

function MenuDropMotion({ isNavOpen, toggleNav }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ y: isNavOpen ? 0 : -50, opacity: isNavOpen ? 1 : 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <MenuDropDown isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </motion.div>
  );
}

const HomeIcon = () => {
  return (
    <Link to="/" className="cross-icon">
      <img src="/cat.svg" alt="Cat Logo" width="24" />
    </Link>
  );
};

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isReduced, setIsReduced] = useState(window.innerWidth < 530);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setIsReduced(window.innerWidth < 530);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`Navigation ${isReduced ? "reduced" : ""}`}>
      {!isReduced && <BlurOverlay isReduced={isReduced} />}
      <Squircle
        className={`nav-container ${isNavOpen ? "active" : ""}`}
        cornerRadius={isReduced ? 24 : 0}
        cornerSmoothing={isReduced ? 0.6 : 0}
      >
        {!isReduced && (
          <>
            <NavHome isActive={isActive} closeNav={closeNav} />
            <NavRightLinks
              isActive={isActive}
              hovered={isNavHovered}
              setHovered={setIsNavHovered}
            />
          </>
        )}
        {isReduced && (
          <>
            <HomeIcon />
            <MenuButton
              toggleNav={toggleNav}
              isNavOpen={isNavOpen}
              currentPage={location.pathname}
            />
          </>
        )}
      </Squircle>
      <AnimatePresence>
        {isReduced && isNavOpen && (
          <MenuDropMotion isNavOpen={isNavOpen} toggleNav={toggleNav} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
