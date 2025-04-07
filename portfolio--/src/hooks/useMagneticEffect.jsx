// This file defines the useMagneticEffect hook, creating a magnetic hover effect by dynamically adjusting element positions and scale based on mouse movement.

import { useEffect, useState } from "react";
import { throttle } from "lodash";

const useMagneticEffect = (containerRef, imageRefs) => {
  const [positions, setPositions] = useState(
    imageRefs.map(() => ({ x: 0, y: 0, scale: 1 }))
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      if (!containerRef.current || hoveredIndex === null) return;

      const { clientX, clientY } = e;
      const containerRect = containerRef.current.getBoundingClientRect();

      const newPositions = imageRefs.map((ref, index) => {
        if (!ref.current || index !== hoveredIndex)
          return { x: 0, y: 0, scale: 1 };

        const rect = ref.current.getBoundingClientRect();
        const distanceX = clientX - (rect.left + rect.width / 2);
        const distanceY = clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        const maxDistance =
          Math.max(containerRect.width, containerRect.height) / 2;
        const effectStrength = Math.max(0, 1 - distance / maxDistance);

        const x = distanceX * effectStrength * 0.5;
        const y = distanceY * effectStrength * 0.5;
        const scale = 1 + effectStrength * 0.1;

        return { x, y, scale };
      });

      setPositions(newPositions);
    }, 50);

    const handleMouseLeave = () => {
      setPositions(imageRefs.map(() => ({ x: 0, y: 0, scale: 1 })));
      setHoveredIndex(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, imageRefs, hoveredIndex]);

  return [positions, setHoveredIndex];
};

export default useMagneticEffect;
