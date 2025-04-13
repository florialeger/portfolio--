// This file defines the useThemeMotion hook, adding interactive motion effects to the wheel theme based on mouse movement and hover state.

import { useEffect } from "react";

const useThemeMotion = (isHovered, ref) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered && ref?.current) {
        const rect = ref.current.getBoundingClientRect(); // Get the dimensions and position of the element.

        // Calculate the mouse position relative to the center of the element.
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Apply a slight translation effect based on the mouse position.
        // The translation is scaled down by 0.1 to keep the motion subtle.
        ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        ref.current.style.transition = "transform 0.5s ease";
      } else if (ref?.current) {
        // Reset the transformation when the hover state is false.
        ref.current.style.transform = `translate(0, 0)`;
        ref.current.style.transition = "transform 0.5s ease";
      }
    };

    // Attach the mousemove event listener to track mouse movements.
    document.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts or dependencies change.
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, ref]); // Dependency array ensures the effect runs when `isHovered` or `ref` changes.
};

export default useThemeMotion;
