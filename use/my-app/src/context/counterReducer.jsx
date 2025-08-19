// State awal
export const initialState = { count: 0 };

// Reducer function
export function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Aksi tidak dikenali: ${action.type}`);
  }
}