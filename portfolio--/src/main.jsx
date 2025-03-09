import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { themes } from "./assets/styles/theme.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.jsx";
import "./index.css";

function Main() {
  const [theme, setTheme] = useState("white");

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <StrictMode>
      <BrowserRouter>
        <App />
        <Navigation />
        <ThemeSwitcher currentTheme={theme} setCurrentTheme={setTheme} setTheme={setTheme} />
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);