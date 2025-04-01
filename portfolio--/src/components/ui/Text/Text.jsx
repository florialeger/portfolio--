import PropTypes from "prop-types";
import useTypedText from "../../../hooks/useTypedText";
import "./Text.css";
/*
export const Text = ({ type, children, className, ...props }) => {
  const Tag = type;
  return (
    <Tag className={`text ${type} ${className}`} {...props}>
      {children}
    </Tag>
  );
};*/

export const Text = ({ type, children, className, ...props }) => {
  // Ensure the `type` prop is a valid HTML tag
  const validTags = ["p", "span", "a", "div", "h1", "h2", "h3", "h4", "h5", "h6"];
  const Tag = validTags.includes(type) ? type : "p";

  return (
    <Tag className={`text ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const MotionText = ({ type, strings, className, ...props }) => {
  const Tag = type;
  const { text, isBlinking, isTypingComplete, elementRef } = useTypedText(strings);

  return (
    <Tag className={`text ${type} ${className}`} {...props} ref={elementRef}>
      {text}
      <span className={`cursor ${isBlinking ? "blinking" : ""}`} style={{ opacity: isTypingComplete ? 0 : 1 }}></span>
    </Tag>
  );
};

Text.propTypes = {
  type: PropTypes.oneOf(["p", "span", "a", "div", "h1", "h2", "h3", "h4", "h5", "h6"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  type: "span", 
  className: "",
};


Text.propTypes = MotionText.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "a"]),
  children: PropTypes.node,
  className: PropTypes.string,
};

Text.defaultProps = MotionText.defaultProps = {
  type: "p",
  className: "",
};