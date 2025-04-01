import React, { createContext, useContext, useState } from "react";

const ScrollPositionContext = createContext();

export const ScrollPositionProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollPositionContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {children}
    </ScrollPositionContext.Provider>
  );
};

export const useScrollPosition = () => useContext(ScrollPositionContext);