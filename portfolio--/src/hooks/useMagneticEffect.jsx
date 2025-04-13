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

      // Get the mouse position.
      const { clientX, clientY } = e;
      const containerRect = containerRef.current.getBoundingClientRect();

      const newPositions = imageRefs.map((ref, index) => {
        // If the current image is not hovered, reset its position and scale.
        if (!ref.current || index !== hoveredIndex)
          return { x: 0, y: 0, scale: 1 };

        // Get the hovered image's dimensions.
        const rect = ref.current.getBoundingClientRect();
        const distanceX = clientX - (rect.left + rect.width / 2); // Horizontal distance from the mouse to the image center.
        const distanceY = clientY - (rect.top + rect.height / 2); // Vertical distance from the mouse to the image center.
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2); // Euclidean distance to the image center.

        const maxDistance =
          Math.max(containerRect.width, containerRect.height) / 2;
        const effectStrength = Math.max(0, 1 - distance / maxDistance);

        // Calculate the new position offsets (x, y) for the image.
        // The offsets are proportional to the distance and the effect strength, but scaled down by 0.5 to limit movement.
        const x = distanceX * effectStrength * 0.5;
        const y = distanceY * effectStrength * 0.5;
        const scale = 1 + effectStrength * 0.1;

        return { x, y, scale };
      });

      setPositions(newPositions); // Update the positions state with the new values.
    }, 50); // Throttle the mousemove handler to run at most once every 50ms for performance.

    const handleMouseLeave = () => {
      // Reset all positions and scales when the mouse leaves the container.
      setPositions(imageRefs.map(() => ({ x: 0, y: 0, scale: 1 })));
      setHoveredIndex(null);
    };

    // Attach event listeners for mouse movement and mouse leave.
    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Clean up event listeners when the component unmounts or dependencies change.
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, imageRefs, hoveredIndex]);

  return [positions, setHoveredIndex];
};

export default useMagneticEffect;
