import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { Text } from "../../ui/Text/Text";
import LineIcon from "../../ui/Icon/LineIcon";
import { PlaygroundIcon, WorkIcon, AboutIcon, NameIcon } from "../../ui/Icon/NavIcons";
import "./Navigation.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Playground", path: "/playground" },
  { name: "About", path: "/about" },
];

const BlurOverlay = ({ isReduced }) => (
  <div className={`gradient-blur ${isReduced ? "reduced" : ""}`}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const BackgroundSlider = memo(({ activeIndex, linkRefs, hoveredIndex }) => {
  const activeLinkRef =
    linkRefs[hoveredIndex !== null ? hoveredIndex : activeIndex]?.current;
  return (
    <motion.div
      className="background-slider"
      initial={{ x: 0, width: 0 }}
      animate={{
        opacity: activeLinkRef ? 1 : 0,
        x: activeLinkRef ? activeLinkRef.offsetLeft : 0,
        width: activeLinkRef ? activeLinkRef.offsetWidth : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        background: "var(--backgroundNavLinks)",
        border: "1.5px solid var(--backgroundNavReduced)",
        boxShadow: " var(--shadows--mini) ",
      }}
    />
  );
});

const Arrow = memo(({ path, hovered }) => (
  <motion.div
    className="arrow"
    animate={{
      rotate: hovered === path ? -225 : 0, // Rotate the arrow on hover
      height: hovered === path ? 3.2 : 2.2, // Adjust height on hover
    }}
    transition={{
      duration: 0.3, // Reduce duration for faster animation
      ease: "easeInOut", // Use a smoother easing function
    }}
  >
    <LineIcon width={24} hovered={hovered === path} />
  </motion.div>
));

/*
const NavLink = memo(
  ({
    path,
    isActive,
    hovered,
    setHovered,
    refProp,
    index,
    setHoveredIndex,
  }) => (
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
  )
);*/

const NavLink = memo(
  ({
    path,
    isActive,
    hovered,
    setHovered,
    refProp,
    index,
    setHoveredIndex,
  }) => {
    const icons = {
      "/playground": PlaygroundIcon,
      "/work": WorkIcon,
      "/about": AboutIcon,
    };

    const IconComponent = icons[path];

    return (
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
          <IconComponent hovered={hovered === path} />
          <Arrow path={path} hovered={hovered} />

        </Link>
      </li>
    );
  }
);

const NavHome = memo(({ isActive, closeNav }) => (
  <ul className="nav-links nav-left">
    <li className={`nav-link ${isActive("/") ? "active" : ""}`}>
      <Link to="/" onClick={closeNav} className="home">
      <NameIcon />
      </Link>
    </li>
  </ul>
));

const NavRightLinks = memo(
  ({ isActive, hovered, setHovered, linkRefs, activeIndex }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
      <div className="nav-links-container">
        <BackgroundSlider
          activeIndex={activeIndex}
          linkRefs={linkRefs}
          hoveredIndex={hoveredIndex}
        />
        <ul className="nav-links nav-right">
          {navItems.slice(1).map((item, index) => (
            <NavLink
              key={item.path}
              path={item.path}
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
  }
);

const CrossIcon = memo(() => (
  <div className="cross-icon">
    <motion.div
      className="cross-icon-bar"
      initial={{ opacity: 0, display: "flex", justifyContent: "center" }}
      animate={{ opacity: 1, rotate: 45, y: 2, x: 1 }}
      transition={{ duration: 0.1 }}
    />
    <motion.div
      className="cross-icon-bar"
      initial={{ opacity: 0, display: "flex", justifyContent: "center" }}
      animate={{ opacity: 1, rotate: -50, y: -2, x: 0 }}
      transition={{ duration: 0.1 }}
    />
  </div>
));

const MenuButton = memo(({ toggleNav, isNavOpen }) => (
  <div
    className={`menu-button ${isNavOpen ? "open" : "closed"}`}
    onClick={toggleNav}
    style={{   backdropFilter: "blur(24px)"}}
  >
    {!isNavOpen && (
      <motion.div
        className="menu-button-content"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Text type="span" className="text button">
          MENU
        </Text>
        <HomeIcon path="classic-cat" width={26} />
      </motion.div>
    )}
    {isNavOpen && <CrossIcon />}
  </div>
));

const MenuDropDown = ({ toggleNav, currentPage }) => (
  <div className="menu-dropdown-container">
    {navItems.map((item) => (
      <div key={item.path}>
        <Link
          to={item.path}
          className={`menu-item ${currentPage === item.path ? "active" : ""}`}
          onClick={toggleNav}
        >
          <Text
            type="span"
            className={`text button ${
              currentPage === item.path ? "active" : ""
            }`}
          >
            {item.name.toUpperCase()}
          </Text>
        </Link>
      </div>
    ))}
  </div>
);

const MenuDropMotion = ({ isNavOpen, toggleNav }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {isNavOpen && (
        <motion.div
          className="menu-drop-motion"
          initial={{ opacity: 0, y: -5, scale: 0.95, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <MenuDropDown toggleNav={toggleNav} currentPage={location.pathname} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HomeIcon = memo(({ path, width }) => (
  <img src={`/${path}.svg`} alt={`${path} Logo`} width={width} />
));

const DecorationIcon = ({ isNavOpen }) => (
  <>
    {isNavOpen && (
      <>
        <motion.div
          className="decoration-icon decoration-icon-left"
          animate={{
            opacity: 1,
            left: "-50px",
            bottom: "40px",
            rotate: "20deg",
          }}
          transition={{ type: "spring", stiffness: 150, damping: 30 }}
        >
          <HomeIcon path="yotsuba" width={260} />
        </motion.div>
        <motion.div
          className="decoration-icon decoration-icon-right"
          animate={{
            opacity: 1,
            right: "-70px",
            bottom: "180px",
            rotate: "-10deg",
          }}
          transition={{ type: "spring", stiffness: 130, damping: 25 }}
        >
          <HomeIcon path="fusee" width={300} />
        </motion.div>
      </>
    )}
  </>
);

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isReduced, setIsReduced] = useState(window.innerWidth < 680);

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);

  const linkRefs = navItems.slice(1).map(() => useRef(null));
  const activeIndex = useMemo(
    () =>
      navItems.slice(1).findIndex((item) => item.path === location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsReduced(window.innerWidth < 680);
    }, 300);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`Navigation ${isReduced ? "reduced" : ""}`}>
      <BlurOverlay isReduced={isReduced} />
      <div className={`nav-container ${isNavOpen ? "active" : ""}`}>
        {!isReduced && (
          <>
            <NavHome isActive={isActive} closeNav={closeNav} />
            <NavRightLinks
              isActive={isActive}
              hovered={isNavHovered}
              setHovered={setIsNavHovered}
              linkRefs={linkRefs}
              activeIndex={activeIndex}
            />
          </>
        )}
        {isReduced && (
          <>
            <MenuButton
              toggleNav={toggleNav}
              isNavOpen={isNavOpen}
              currentPage={location.pathname}
            />
            <MenuDropMotion
              isNavOpen={isNavOpen}
              toggleNav={toggleNav}
              location={location.pathname}
            />
            <DecorationIcon isNavOpen={isNavOpen} />
          </>
        )}
      </div>
    </nav>
  );
};

export default memo(Navigation);
