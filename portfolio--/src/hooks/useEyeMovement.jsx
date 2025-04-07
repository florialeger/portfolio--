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

      const leftEyeX = left + (110 / 295) * width;
      const leftEyeY = top + (199.5 / 364) * height;

      const rightEyeX = left + (179 / 295) * width;
      const rightEyeY = top + (201 / 364) * height;

      const deltaXLeft = clientX - leftEyeX;
      const deltaYLeft = clientY - leftEyeY;

      const deltaXRight = clientX - rightEyeX;
      const deltaYRight = clientY - rightEyeY;

      const maxDistanceX = 6;
      const maxDistanceYUp = 1;
      const maxDistanceYDown = 4;

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
