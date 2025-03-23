import React, { useState, useEffect } from "react";
import { Text, MotionText } from "../components/ui/Text/Text";
import { FadeIn } from "../hooks/FadeIn";
import Card from "../components/ui/Card/Card";
import axios from "axios";
import { LayoutGroup } from "framer-motion";
import "./Pages.css";

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => setProjects(response.data.slice(0, 3))) // Display first 3 projects
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        maxWidth: "1100px",
        width: "80%",
        height: "100%",
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
        <LayoutGroup>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "24px",
              width: "60%",
              margin: "24px auto",
            }}
          >
            {projects.map((project) => (
              <Card key={project._id} project={project} />
            ))}
          </div>
        </LayoutGroup>
      </FadeIn>
    </div>
  );
}

export default Home;