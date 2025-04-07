// This file defines the ResumeButton component, providing a styled button with hover animations to download a resume.
import React, { useState } from "react";
import { Text } from "@components/ui/Text.jsx";
import {
  DownloadTopIcon,
  DownloadBottomIcon,
} from "@components/ui/icon/SignIcon.jsx";
import "./Button.css";

const ResumeButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const iconSize = `calc(var(--font-size-button) * 2.6`;
  const strokeWidth = `calc(var(--font-size-button) * 4)`;

  return (
    <a
      href="/src/assets/pdf/cv.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`resume-button ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text type="span" className="resume-text button">
        resume
      </Text>
      <div className="resume-icon-container">
        <DownloadBottomIcon
          width={iconSize}
          color="var(--textWhite)"
          strokeWidth={strokeWidth}
          hovered={isHovered}
        />
        <DownloadTopIcon
          width={iconSize}
          color="var(--textWhite)"
          strokeWidth={strokeWidth}
          hovered={isHovered}
        />
      </div>
    </a>
  );
};

export default ResumeButton;
