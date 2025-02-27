import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export const FadeIn = ({ children, duration = 0.5, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.05, 0.45, 1],
      }}
    >
      {children}
    </motion.div>
  );
};