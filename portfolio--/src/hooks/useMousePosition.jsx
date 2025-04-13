// This file defines the useMousePosition hook, tracking the mouse position relative to specified container elements.

import { useEffect, useState } from "react";

export const useMousePosition = (containerRefs) => {
  const [positions, setPositions] = useState(
    containerRefs.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const handleMouseMove = (ev) => {
      containerRefs.forEach((ref, index) => {
        if (ref && ref.current) {
          const rect = ref.current.getBoundingClientRect(); // Get the dimensions and position of the container.

          // Check if the mouse is within the boundaries of the current container.
          if (
            ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom
          ) {
            // Calculate the mouse position relative to the container.
            const relativeX = ev.clientX - rect.left;
            const relativeY = ev.clientY - rect.top;

            setPositions((prevPositions) => {
              const newPositions = [...prevPositions]; // Create a copy of the previous positions.
              newPositions[index] = { x: relativeX, y: relativeY }; // Update the position for the current container.
              return newPositions; // Return the updated positions array.
            });
          }
        }
      });
    };

    // Attach the mousemove event listener to track mouse movements.
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts or dependencies change.
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRefs]); // Dependency array ensures the effect runs when containerRefs change.

  return positions;
};
