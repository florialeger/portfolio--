import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { themes } from "./styles/theme";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Navigation from "./components/Navigation.jsx";
import "./index.css";

function Main() {
  const [theme, setTheme] = useState("white");

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-color`, value);
    });
    root.style.setProperty("--primary-text-color", themes[theme].primarytext);
  }, [theme]);

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation />
        <App />
        <ThemeSwitcher setTheme={setTheme} />
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);