import React, { useRef } from "react";
import CustomInput from "./CustomInput";

const Parent = () => {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Fokuskan Input</button>
    </div>
  );
};

export default Parent;
