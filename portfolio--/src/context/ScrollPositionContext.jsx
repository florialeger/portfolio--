// This file provides a context to track and manage the scroll position across the application.

import React, { useState, useEffect, createContext, useContext } from "react";

export const ScrollPositionContext = createContext();

export const ScrollPositionProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {}, [scrollPosition]);

  return (
    <ScrollPositionContext.Provider
      value={{ scrollPosition, setScrollPosition }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
};

export const useScrollPosition = () => useContext(ScrollPositionContext);
