import React, { useState, useEffect } from "react";
import { Text } from "../components/ui/Text/Text";
import { FadeIn } from "../hooks/FadeIn";
import Card from "../components/ui/Card/Card";
import { BounceInView } from "../hooks/useBounceInView";
import axios from "axios";
import "./Pages.css";

function Playground() {
  const [playgrounds, setPlaygrounds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/playgrounds")
      .then((response) => {
        setPlaygrounds(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Text type="h1" children={[`Playground`]} />
      <FadeIn duration={0.6} delay={0.8} className="work-container-div">
        <div className="playground-content-container">
          {playgrounds.map((playground) => (
            <BounceInView key={playground._id} >
            <Card project={{ ...playground, type: 'playground' }} /></BounceInView>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

export default Playground;