import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const useMousePosition = (containerRefs) => {
  const [positions, setPositions] = useState(containerRefs.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    const updatePosition = debounce((index, x, y) => {
      if (containerRefs[index] && containerRefs[index].current) {
        const rect = containerRefs[index].current.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          const relativeX = x - rect.left;
          const relativeY = y - rect.top;

          setPositions((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions[index] = { x: relativeX, y: relativeY };
            return newPositions;
          });
        }
      }
    }, 50); // Debounce updates to every 50ms

    const handleMouseMove = (ev) => {
      containerRefs.forEach((ref, index) => {
        updatePosition(index, ev.clientX, ev.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRefs]);

  return positions;
};