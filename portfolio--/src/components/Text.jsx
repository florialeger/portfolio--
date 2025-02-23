import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Text.css";

const Text = ({ type, children, className, ...props }) => {
  const Tag = type;
  return (
    <Tag className={`text ${type}`} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  type: "p",
  className: "",
};

export default Text;

const useTypedText = (strings, typeSpeed, backSpeed, loop) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % strings.length;
      const fullText = strings[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? backSpeed : typeSpeed);

      if (!isDeleting && text === fullText) {
        setIsBlinking(true);
        setTimeout(() => setIsDeleting(true), 6000); // Long délai avant de commencer à effacer
      } else if (isDeleting && text === "") {
        setIsBlinking(true);
        setTypingSpeed(typeSpeed)
        setLoopNum(loopNum + 1);
        setTimeout(() => setIsDeleting(false), 2000); // Court délai avant de commencer à écrire
      } else {
        setIsBlinking(false);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, strings, typeSpeed, backSpeed]);

  return { text, isBlinking };
};

export const MotionText = ({ type, strings, className, ...props }) => {
  const Tag = type;
  const { text, isBlinking } = useTypedText(strings, 100, 25, true);

  return (
    <Tag className={`text ${type} ${className}`} {...props}>
      {text}
      <span className={`cursor ${isBlinking ? "blinking" : ""}`}></span>
    </Tag>
  );
};

MotionText.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"]),
  strings: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

MotionText.defaultProps = {
  type: "p",
  className: "",
};