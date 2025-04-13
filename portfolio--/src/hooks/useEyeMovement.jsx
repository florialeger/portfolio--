// This file defines the useEyeMovement hook, enabling eye-tracking animations by calculating eye positions based on mouse movement.

import { useState, useEffect, useRef } from "react";

export function useEyeMovement() {
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  const miiContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!miiContainerRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } =
        miiContainerRef.current.getBoundingClientRect();

      // Calculate the X and Y coordinate of the left eye's center based on container dimensions.
      const leftEyeX = left + (110 / 295) * width;
      const leftEyeY = top + (199.5 / 364) * height;

      // Calculate the X and Y coordinate of the right eye's center based on container dimensions.
      const rightEyeX = left + (179 / 295) * width;
      const rightEyeY = top + (201 / 364) * height;

      // Calculate the distance (delta) between the mouse position and each eye's center.
      const deltaXLeft = clientX - leftEyeX;
      const deltaYLeft = clientY - leftEyeY;

      const deltaXRight = clientX - rightEyeX;
      const deltaYRight = clientY - rightEyeY;

      // Define the maximum movement range for the eyes.
      const maxDistanceX = 6;
      const maxDistanceYUp = 1;
      const maxDistanceYDown = 4;

      // Calculate the ratio to constrain the eye movement within the maximum range.
      // This ensures the eyes don't move too far from their center.
      const ratioLeftX = Math.min(maxDistanceX / Math.abs(deltaXLeft), 1);
      const ratioLeftY =
        deltaYLeft < 0
          ? Math.min(maxDistanceYUp / Math.abs(deltaYLeft), 1)
          : Math.min(maxDistanceYDown / Math.abs(deltaYLeft), 1);

      const ratioRightX = Math.min(maxDistanceX / Math.abs(deltaXRight), 1);
      const ratioRightY =
        deltaYRight < 0
          ? Math.min(maxDistanceYUp / Math.abs(deltaYRight), 1)
          : Math.min(maxDistanceYDown / Math.abs(deltaYRight), 1);

      // Set the new eye positions by scaling the deltas with the calculated ratios.
      // This ensures the eyes move proportionally to the mouse position but stay within the allowed range.
      setLeftEyePosition({
        x: deltaXLeft * ratioLeftX,
        y: deltaYLeft * ratioLeftY,
      });
      setRightEyePosition({
        x: deltaXRight * ratioRightX,
        y: deltaYRight * ratioRightY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { leftEyePosition, rightEyePosition, miiContainerRef };
}
