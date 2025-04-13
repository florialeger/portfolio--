// This file defines the LoadingScreen component, displayed at the first loading of the site.

import React, { useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onFinished }) => {
  useEffect(() => {
    const signs = document.querySelectorAll(".path");
    if (!signs || signs.length === 0) {
      console.warn("LoadingScreen: SVG paths not found.");
      const fallbackTimeout = setTimeout(() => {
        if (typeof onFinished === "function") {
          onFinished(false); // Indicate maybe an issue, or just finish
        }
      }, 100); // Short delay
      return () => clearTimeout(fallbackTimeout);
    }

    const animationDurations = [1, 1.6, 0.2];
    const delayBetweenSigns = 100;
    let currentSign = 0;

    function animateSign() {
      if (currentSign < signs.length) {
        const path = signs[currentSign]?.querySelector("path"); 

        // Check if path exists and has getTotalLength method
        if (path && typeof path.getTotalLength === "function") {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length} ${length}`; 
          path.style.strokeDashoffset = length;
          path.style.animation = `dash ${animationDurations[currentSign]}s ease-in-out forwards`;

          const animationEndHandler = () => {
            currentSign++;
            setTimeout(animateSign, delayBetweenSigns);
          };

          path.addEventListener("animationend", animationEndHandler, {
            once: true,
          });

          return () => {
            path.removeEventListener("animationend", animationEndHandler);
          };
        } else {
          console.warn(
            `LoadingScreen: Path or getTotalLength not found for sign index ${currentSign}`
          );
          currentSign++;
          setTimeout(animateSign, delayBetweenSigns);
        }
      } else {
        const finishTimeout = setTimeout(() => {
          if (typeof onFinished === "function") {
            onFinished(false);
          }
        }, 800);
        return () => clearTimeout(finishTimeout);
      }
    }

    const cleanupAnimation = animateSign();

    return cleanupAnimation;
  }, [onFinished]);
  return (
    <div className="svg-container">
      <svg
        id="sign1"
        className="path"
        width="381"
        height="277"
        viewBox="0 0 381 277"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M168.059 107.626C212.059 13.1265 -5.43883 -36.8739 113.559 155.626C244.922 368.126 -139.932 171.626 113.56 155.626C170.752 152.016 266.57 159.626 357.059 177.626"
          stroke="black"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
      <svg
        id="sign2"
        className="path"
        width="381"
        height="277"
        viewBox="0 0 381 277"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M119.07 146.127C155.07 146.627 158.57 119.036 155.07 117.127C149.57 114.127 136.57 130.627 135.57 144.127C133.1 149.355 155.07 157.627 172.57 130.127C176.735 123.127 193.192 101.373 194 122C194.93 90.3731 143 162 194 130.127C194 275 119.07 228.5 194 148C210.923 135.401 242.57 117.627 235.07 112.627C229.07 108.627 215.047 117.127 212.07 133.979C208.07 156.627 225.07 156.627 253.57 119.127L250.07 154.626C289.57 84.6256 285.07 149.626 307.57 114.126"
          stroke="black"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        id="sign3"
        className="path"
        width="381"
        height="277"
        viewBox="0 0 381 277"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M133.07 118.626C144.448 111.267 156.07 101.126 162.57 86.1265"
          stroke="black"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LoadingScreen;
