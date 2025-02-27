import PropTypes from "prop-types";
import useTypedText from "../../hooks/useTypedText";
import "./Text.css";

export const Text = ({ type, children, className, ...props }) => {
  const Tag = type;
  return (
    <Tag className={`text ${type} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const MotionText = ({ type, strings, className, ...props }) => {
  const Tag = type;
  const { text, isBlinking } = useTypedText(strings);

  return (
    <Tag className={`text ${type} ${className}`} {...props}>
      {text}
      <span className={`cursor ${isBlinking ? "blinking" : ""}`}></span>
    </Tag>
  );
};

Text.propTypes = MotionText.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"]),
  children: PropTypes.node,
  className: PropTypes.string,
};

Text.defaultProps = MotionText.defaultProps = {
  type: "p",
  className: "",
};
