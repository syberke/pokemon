import React, { useState, useMemo } from 'react';

function expensiveCalculation(num) {
  console.log('🔄 Perhitungan ulang...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) { 
    result += num;
  }
  return result;
}

export default function ExpensiveCalculation() {
  const [number, setNumber] = useState(1);

  const calculation = useMemo(() => expensiveCalculation(number), [number]);

  const themeStyle = {
    backgroundColor:  '#242424',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
  };

  return (
    <div style={themeStyle}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <h2>Hasil: {calculation}</h2>
    </div>
  );
}