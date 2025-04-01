import { useEffect } from "react";
import { useAnimation } from "framer-motion";

const useSpringEnter = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    });
  }, [controls]);

  return controls;
};

export default useSpringEnter;