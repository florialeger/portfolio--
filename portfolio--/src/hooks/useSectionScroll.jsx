import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const useSectionScroll = (sections) => {
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(
    (event) => {
      if (isScrolling) return;

      if (event.deltaY > 0 && index < sections.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
        setIsScrolling(true);
      } else if (event.deltaY < 0 && index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
        setIsScrolling(true);
      }
    },
    [index, sections.length, isScrolling]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Duration should match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

  const SectionWrapper = ({ children }) => (
    <motion.div
      initial={{ y: "0vh" }}
      animate={{ y: `-${index * 100}vh` }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="sections-wrapper"
    >
      {children}
    </motion.div>
  );

  return SectionWrapper;
};

export default useSectionScroll;