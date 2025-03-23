import { useState, useEffect } from "react";

const useTypedText = (strings, typeSpeed = 100, backSpeed = 25) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

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
        setTimeout(() => {
          setIsDeleting(true);
          setIsTypingComplete(true);
          setIsBlinking(false);
          setIsCursorVisible(false);
        }, 5000);
      } else if (isDeleting && text === "") {
        setIsBlinking(false);
        setTypingSpeed(typeSpeed);
        setLoopNum(loopNum + 1);
        setTimeout(() => setIsDeleting(false), 2000);
      } else {
        setIsBlinking(false);
      }
    };

    if (!isTypingComplete) {
      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [text, isDeleting, loopNum, typingSpeed, strings, typeSpeed, backSpeed, isTypingComplete]);

  return { text, isBlinking, isTypingComplete, isCursorVisible };
};

export default useTypedText;