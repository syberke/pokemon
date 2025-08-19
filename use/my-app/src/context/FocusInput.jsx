import React, { useRef, useEffect } from 'react';

export default function FocusInput() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <label htmlFor="name">Name: </label>
      <input
        ref={inputRef}
        id="name"
        type="text"
        placeholder="masukkan nama"
      />
    </div>
    </form>
  );
}