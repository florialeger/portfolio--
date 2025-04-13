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
          // Start the typing animation when the element is in view.
          setIsInView(true);
          // Disconnect the observer to avoid redundant checks.
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible.
    );

    if (elementRef.current) {
      // Observe the element for visibility changes.
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current) {
        // Clean up the observer when the component unmounts.
        observer.unobserve(elementRef.current);
      }
    };
  }, []); // Run this effect only once on mount.

  useEffect(() => {
    if (!isInView) return; // Do nothing if the element is not in view.

    const handleTyping = () => {
      const i = loopNum % strings.length; // Determine the current string to type.
      const fullText = strings[i]; // Get the full text of the current string.

      // Update the text state based on whether we are typing or deleting.
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      // Adjust the typing speed based on the current action (typing or deleting).
      setTypingSpeed(isDeleting ? backSpeed : typeSpeed);

      // Check if the full text has been typed out.
      if (!isDeleting && text === fullText) {
        setIsBlinking(true);
        setTimeout(() => {
          setIsDeleting(true); // Start deleting after a delay.
          setIsTypingComplete(true); // Mark the typing as complete.
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
