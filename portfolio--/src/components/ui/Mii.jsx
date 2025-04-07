// This file defines the Mii component, rendering an interactive avatar 
// with tilt and eye-tracking animations.

import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { tiltOptions } from "@hooks/tiltOptions.jsx";
import { useEyeMovement } from "@hooks/useEyeMovement.jsx";
import miiSkin from "@assets/svg/mii.svg";
import miiLeftEye from "@assets/svg/mii-left-eye.svg";
import miiRightEye from "@assets/svg/mii-right-eye.svg";
import "./Mii.css";

function Tilt({ options, children }) {
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

  return (
    <div className="tilt-container" ref={tiltRef}>
      {children}
    </div>
  );
}

export default function Mii({ position }) {
  const { leftEyePosition, rightEyePosition, miiContainerRef } =
    useEyeMovement();

  return (
    <Tilt options={tiltOptions} style={{ position: { position } }}>
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
