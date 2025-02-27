import { useEffect, useState } from "react";

export const useMousePosition = (containerRefs) => {
  const [positions, setPositions] = useState(containerRefs.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    const updatePosition = (index, x, y) => {
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
    };

    const handleMouseMove = (ev) => {
      containerRefs.forEach((ref, index) => {
        updatePosition(index, ev.clientX, ev.clientY);
      });
    };

    const handleTouchMove = (ev) => {
      const touch = ev.touches[0];
      containerRefs.forEach((ref, index) => {
        updatePosition(index, touch.clientX, touch.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRefs]);

  return positions;
};