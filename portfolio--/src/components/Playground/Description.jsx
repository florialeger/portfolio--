import React from "react";
import { Text } from "@ui/Text";

const Description = () => {
  return (
    <div
      className="playground-description-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        paddingTop: "2.5em",
        gap: "1.25em",
      }}
    >
      <Text type="p" className="text ">
        Drawing has always been a part of me — more than a hobby, it just feels
        right. When I got into UX design, it wasn't a shift but a natural
        extension. Shapes, colors, and light now have a purpose beyond the page.
      </Text>
      <Text type="p" className="text ">
        Every sketch and design is an experiment, a way to turn instinct into
        skill. And the best part? It still feels like play. If I can do work
        that doesn't feel like work, that's exactly what I want.
      </Text>
      <Text type="p" className="text ">
        Eighteen years in, I keep growing at my own pace, always striving for
        more. I don't post much online, but I create whenever I can. Lately,
        I've been channeling that energy into UI design — another canvas for
        balance, structure, and emotion. The process, the curiosity, the joy of
        making — that's what drives me.
      </Text>
    </div>
  );
};

export default Description;