// This file defines the useTypedText hook, creating a typing
// animation effect for strings with customizable speeds and looping behavior.

import { useState, useEffect, useRef } from "react";

const useTypedText = (strings, typeSpeed = 100, backSpeed = 25) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

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
  }, [
    text,
    isDeleting,
    loopNum,
    typingSpeed,
    strings,
    typeSpeed,
    backSpeed,
    isTypingComplete,
    isInView,
  ]);

  return { text, isBlinking, isTypingComplete, elementRef };
};

export default useTypedText;
