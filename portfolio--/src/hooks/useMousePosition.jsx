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
          const rect = ref.current.getBoundingClientRect();
          if (
            ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom
          ) {
            const relativeX = ev.clientX - rect.left;
            const relativeY = ev.clientY - rect.top;

            setPositions((prevPositions) => {
              const newPositions = [...prevPositions];
              newPositions[index] = { x: relativeX, y: relativeY };
              return newPositions;
            });
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRefs]);

  return positions;
};
