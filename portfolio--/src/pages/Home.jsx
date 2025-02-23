import React from "react";
import Text, { MotionText } from "../components/Text";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        maxWidth: "1100px",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <MotionText
        type="h1"
        strings={["Hi, I'm Floria, a student in Cognitic."]}
      />
      <Text
        type="h2"
        children={[
          `I'm Floria, a second-year student at the École Nationale Supérieure de Cognitique (ENSC), 
          where I explore mental processes and human interactions, a fascinating field that combines 
          psychology, technology and design.`,
        ]}
      />
    </div>
  );
}

export default Home;
