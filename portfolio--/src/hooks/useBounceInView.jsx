// This file defines the BounceInView component, adding a bounce-in animation to elements when they enter the viewport.

import { useInView } from "react-hook-inview";
import { motion } from "framer-motion";

export const BounceInView = ({ children, ...props }) => {
  const [ref, isInView] = useInView({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: isInView ? 1 : 0.9, opacity: isInView ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
