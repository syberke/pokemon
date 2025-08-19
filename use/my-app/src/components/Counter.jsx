import React, { useReducer } from 'react';
import { counterReducer, initialState } from '../context/counterReducer';

export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Hitungan: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>Tambah</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Kurang</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

