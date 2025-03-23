import React from "react";
import Mii from "../components/Mii/Mii";
import { Text } from "../components/ui/Text/Text";
import { FadeIn } from "../hooks/FadeIn";
import "./Pages.css";

function About() {
  return (
    <div className="about-container">
      <FadeIn duration={0.6} delay={0}>
        {" "}
        <Text
          type="h1"
          children={[`About Me...`]}
          style={{ marginBottom: "calc(1vw + 16px)" }}
        />
      </FadeIn>

      <FadeIn duration={0.8} delay={0.1}>
        <div className="about-content-container">
          <div className="about-text-container">
            <Text
              type="p"
              children={[
                `I'm currently a second-year student at ENSC, a cognitive engineering school in Bordeaux,
         with a strong passion for UI and UX design, particularly in accessibility. My background has provided me with a 
         solid foundation in user-friendly interface design.`,
              ]}
              style={{ marginBottom: "1.2em" }}
            />

            <Text
              type="p"
              children={[
                `I've been drawing for nearly twenty years, drawing inspiration from talented artists to enhance my skills. 
While I mostly create for myself, I find joy in making art for others. Although my client projects have been informal, they taught 
me about managing deadlines and handling feedback.`,
              ]}
              style={{ marginBottom: "1.2em" }}
            />

            <Text
              type="p"
              children={[
                `Lately, I've become increasingly interested in web design, believing my drawing skills will be beneficial in this area.
 I enjoy exploring new design projects independently and particularly love working with CSS and styling web pages. Outside my academic
  and artistic pursuits, I've played volleyball for nine years, which has instilled the importance of teamwork and pushing personal 
  limits. I also have a keen interest in photography, videography, and animation, which helps me expand my creative horizons.`,
              ]}
              style={{ marginBottom: "1.2em" }}
            />
            <Mii />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default About;
