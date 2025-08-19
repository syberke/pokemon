import React, { useState, useCallback } from "react";

function DaftarItem() {
  const [items, setItems] = useState(["Item 1", "Item 2"]);


  const tambahItem = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  return (
    <div>
      <h2>Daftar Item</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button onClick={tambahItem}>Tambah Item</button>
    </div>
  );
}

export default DaftarItem;
