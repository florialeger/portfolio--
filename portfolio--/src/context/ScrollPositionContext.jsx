import React, { useState, useEffect, createContext, useContext } from "react";

// Create the context
export const ScrollPositionContext = createContext();

export const ScrollPositionProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
  }, [scrollPosition]);

  return (
    <ScrollPositionContext.Provider
      value={{ scrollPosition, setScrollPosition }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
};

// Custom hook to use the context
export const useScrollPosition = () => useContext(ScrollPositionContext);
