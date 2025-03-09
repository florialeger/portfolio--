import React, { useRef } from "react";
import { Text, MotionText } from "../components/Text/Text";
import { FadeIn } from "../hooks/FadeIn";
import { useMousePosition } from "../hooks/useMousePosition";
import { FigmaLogo, CodeLogo, ProcreateLogo } from "./../components/Logo/Logo";

import "./Home.css";

function Home() {
  const procreateRef = useRef(null);
  const figmaRef = useRef(null);
  const codeRef = useRef(null);
  const containerRefs = [procreateRef, figmaRef, codeRef];
  const positions = useMousePosition(containerRefs);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        maxWidth: "1100px",
        width: "80%",
        height : "100%",
        margin: "0 auto",
        paddingTop: "max(10vw, 24px)",
      }}
    >
      <FadeIn duration={0.6} delay={0}>
        <MotionText
          type="h1"
          strings={["Hi, I'm Floria, a student in UX design."]}
          style={{ marginBottom: "calc(1vw + 16px)" }}
        />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1}>
        <Text
          type="h2"
          children={[
            `I'm a second-year student at the École Nationale Supérieure de Cognitique (ENSC), 
          where I explore mental processes and human interactions, a fascinating field that combines 
          psychology, technology and design.`,
          ]}
        />
        <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent : "center",
        gap: "24px",
        width: "60%",
        margin: "24px auto",
      }}>
          <FigmaLogo />
          <CodeLogo />
          <ProcreateLogo />
        </div>
      </FadeIn>
    </div>
  );
}

export default Home;
