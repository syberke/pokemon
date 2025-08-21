import { ThemeProvider } from "./themeProvider";
import { ThemeContext } from "./themeContext";
import { useContext, useRef } from "react";

import SwitchTheme from "./context/SwitchTheme";
import Api from "./components/api";
import Counter from "./components/Counter";
import FocusInput from "./context/FocusInput";
import ExpensiveCalculation from "./context/ExpensiveCalculation";
import TodoApp from "./components/todo";
import ParentComponent from "./components/ParentComponent";
import ScrollPosition from "./components/ScrollPosition";
import Parent from "./components/Parent";
import useLocalStorage from "./hooks/useLocalStorage";

function ThemedLayout() {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useLocalStorage("username", "");
  const inputRef = useRef(null);

  const styles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    minHeight: "100vh",
    minWidth: "100vw",

    transition: "all 0.3s ease",

    };

  return (
    <div style={styles}>
      <SwitchTheme />
      <Api />
      <Counter />
      <FocusInput />
      <ExpensiveCalculation />
      <TodoApp />
      <ParentComponent />
      <div>
        <ScrollPosition />
        <Parent />

        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Simpan ke localStorage"
        />
        <p>Nama di localStorage: {name}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}
