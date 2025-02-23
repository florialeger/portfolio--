import React, { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import miiSkin from "../assets/mii.svg";
import miiLeftEye from "../assets/mii-left-eye.svg";
import miiRightEye from "../assets/mii-right-eye.svg";
import "./Mii.css";

const tiltOptions = {
  max: 10, // Réduire l'angle de rotation maximal pour un effet plus léger
  speed: 1000, // Augmenter la vitesse de l'animation pour ralentir le mouvement
  glare: true,
  "max-glare": 0.2,
  transition: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  gyroscope: true, // Activer l'effet gyroscopique
  gyroscopeMinAngleX: -10, 
  gyroscopeMaxAngleX: 10, 
  gyroscopeMinAngleY: -10,  
  gyroscopeMaxAngleY: 10, 
  gyroscopeSamples: 10,
};

function Tilt({ options, ...rest }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, options);
    }

    return () => {
      if (tiltRef.current && tiltRef.current.VanillaTilt) {
        tiltRef.current.VanillaTilt.destroy();
      }
    };
  }, [options]);

  return <div className="tilt-container" ref={tiltRef} {...rest} />;
}

export default function Mii() {
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  const miiContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!miiContainerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = miiContainerRef.current.getBoundingClientRect();

    const leftEyeX = left + (110 / 295) * width;
    const leftEyeY = top + (199.5 / 364) * height;

    const rightEyeX = left + (179 / 295) * width;
    const rightEyeY = top + (201 / 364) * height;

    const deltaXLeft = clientX - leftEyeX;
    const deltaYLeft = clientY - leftEyeY;

    const deltaXRight = clientX - rightEyeX;
    const deltaYRight = clientY - rightEyeY;

    const maxDistanceX = 6; // Distance maximale pour l'axe X
    const maxDistanceYUp = 1; // Distance maximale vers le haut pour l'axe Y
    const maxDistanceYDown = 4; // Distance maximale vers le bas pour l'axe Y

    const ratioLeftX = Math.min(maxDistanceX / Math.abs(deltaXLeft), 1);
    const ratioLeftY = deltaYLeft < 0
      ? Math.min(maxDistanceYUp / Math.abs(deltaYLeft), 1)
      : Math.min(maxDistanceYDown / Math.abs(deltaYLeft), 1);

    const ratioRightX = Math.min(maxDistanceX / Math.abs(deltaXRight), 1);
    const ratioRightY = deltaYRight < 0
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

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Tilt options={tiltOptions}>
      <div className="mii-container" ref={miiContainerRef}>
        <img src={miiSkin} alt="Mii Skin" className="mii-skin" />
        <img
          src={miiLeftEye}
          alt="Mii Left Eye"
          className="mii-left-eye"
          style={{
            transform: `translate(${leftEyePosition.x}px, ${leftEyePosition.y}px)`,
          }}
        />
        <img
          src={miiRightEye}
          alt="Mii Right Eye"
          className="mii-right-eye"
          style={{
            transform: `translate(${rightEyePosition.x}px, ${rightEyePosition.y}px)`,
          }}
        />
      </div>
    </Tilt>
  );
}