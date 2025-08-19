import { useContext } from "react";
import { ThemeContext } from "../themeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function SwitchTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: theme === "light" ? "#333" : "#fff",
        transition: "color 0.3s ease"
      }}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
