import React, { useState, useEffect } from "react";
import bird1 from "../../../assets/svg/bird1.svg";
import bird2 from "../../../assets/svg/bird2.svg";
import bird3 from "../../../assets/svg/bird3.svg";
import bird4 from "../../../assets/svg/bird4.svg";
import "./LoadingAnimation.css";

const svgs = [bird1, bird2, bird3, bird4];

// Principal function that uses `onComplete`
const LoadingAnimation = ({ duration = 1200, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle through the SVGs every 300ms
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % svgs.length);
    }, 300);

    // Handle visibility and call `onComplete` after the duration
    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (typeof onComplete === "function") {
        onComplete(); // Notify parent component
      }
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onComplete]); // Ensure dependencies are stable

  if (!isVisible) return null;

  return (
    <div className="loading-animation">
      <img src={svgs[currentIndex]} alt={`Loading frame ${currentIndex + 1}`} />
    </div>
  );
};

// Secondary function that doesn't handle `onComplete` (infinite loop)
export const LoadingAnimationWithoutComplete = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycle through the SVGs every 300ms indefinitely
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % svgs.length);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []); // No dependencies, runs indefinitely

  return (
    <div className="loading-animation">
      <img src={svgs[currentIndex]} alt={`Loading frame ${currentIndex + 1}`} />
    </div>
  );
};

export default LoadingAnimation;