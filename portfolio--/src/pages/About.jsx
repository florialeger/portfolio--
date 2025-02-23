import React from "react";
import Mii from "../components/Mii";
import Text from "../components/Text";

function About() {
  return (
    <div className="about-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "calc(402px - 32px)",
        margin: "2em max(8em, 16px)",
      }}
    >
      <Text type="h1" children={[`About Me...`]} />
      <div className="about-content-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "max(5em, 32px)",
          marginTop: "2em"
        }}
      >
        <div className="about-text-container"
          style={{
            display: "flex",
            flexDirection: "column",
            width : "max(60%, calc(100% - 20em))",
          }}
        >
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
me about managing deadlines and handling feedback.
`,
            ]}
            style={{ marginBottom: "1.2em" }}
          />

          <Text
            type="p"
            children={[
              `Lately, I've become increasingly interested in web design, believing my drawing skills will be beneficial in this area.
 I enjoy exploring new design projects independently and particularly love working with CSS and styling web pages. Outside my academic
  and artistic pursuits, I've played volleyball for nine years, which has instilled the importance of teamwork and pushing personal 
  limits. I also have a keen interest in photography, videography, and animation, which helps me expand my creative horizons.
`,
            ]}
            style={{ marginBottom: "1.2em" }}
          />
        </div>
        <Mii />
      </div>
    </div>
  );
}

export default About;
