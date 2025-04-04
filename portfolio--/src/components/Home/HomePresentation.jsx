import React from "react";
import { Text, MotionText } from "@ui/Text.jsx";
import { FadeIn } from "@hooks/FadeIn.jsx";
import "./HomePresentation.css";

const HomePresentation = () => {
  return (
    <div className="home-presentation-container">
      <FadeIn duration={0.6} delay={0}>
        <div style={{ marginBottom: "calc(1vw + 16px)" }}>
          <MotionText
            type="h1"
            strings={["Hi, I'm Floria, a student in UX design."]}
            className="text h1"
          />
        </div>
      </FadeIn>
      <FadeIn duration={0.8} delay={0.2}>
        <Text type="p" className="text">
          I'm Floria, a second-year student at the École Nationale Supérieure de
          Cognitique (ENSC), where I explore mental processes and human
          interactions, a fascinating field that combines psychology, technology
          and design.
        </Text>
      </FadeIn>
    </div>
  );
};

export default HomePresentation;
