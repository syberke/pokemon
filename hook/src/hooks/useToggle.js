import { useState } from "react";

export default function useToggle(initial = true) {
  const [state, setState] = useState(initial);
  const toggle = () => setState((s) => !s);
  return [state, toggle];
}
