// This file defines the Text and MotionText components for rendering styled text and animated typing effects.

import PropTypes from "prop-types";
import useTypedText from "@hooks/useTypedText.jsx";
import "./Text.css";

export const Text = ({ type = "span", children, className = "", ...props }) => {
  // Ensure the `type` prop is a valid HTML tag
  const validTags = [
    "p",
    "span",
    "a",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "button",
  ];
  const Tag = validTags.includes(type) ? type : "p";

  return (
    <Tag className={`text ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const MotionText = ({
  type = "p",
  strings,
  className = "",
  ...props
}) => {
  const Tag = type;
  const { text, isBlinking, isTypingComplete, elementRef } =
    useTypedText(strings);

  return (
    <Tag className={`text ${type} ${className}`} {...props} ref={elementRef}>
      {text}
      <span
        className={`cursor ${isBlinking ? "blinking" : ""}`}
        style={{ opacity: isTypingComplete ? 0 : 1 }}
      ></span>
    </Tag>
  );
};

Text.propTypes = {
  type: PropTypes.oneOf([
    "p",
    "span",
    "a",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "button",
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

MotionText.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "a"]),
  strings: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};
