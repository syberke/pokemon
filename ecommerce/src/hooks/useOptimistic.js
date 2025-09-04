import { useState, useCallback } from 'react';

export const useOptimistic = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [optimisticValue, setOptimisticValue] = useState(initialValue);

  const addOptimistic = useCallback((newValue) => {
    setOptimisticValue(newValue);
    
    // Simulate server confirmation
    setTimeout(() => {
      setValue(newValue);
    }, 1000);
  }, []);

  return [optimisticValue, addOptimistic];
};