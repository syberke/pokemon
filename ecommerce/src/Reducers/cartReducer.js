export const CartAction = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SET_QTY: "SET_QTY",
  RESET: "RESET",
};

export function cartReducer(state, action) {
  switch (action.type) {
    case CartAction.ADD: {
      const exists = state.find((it) => it.id === action.item.id);
      if (exists) {
        return state.map((it) =>
          it.id === action.item.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case CartAction.REMOVE:
      return state.filter((it) => it.id !== action.id);
    case CartAction.SET_QTY:
      return state.map((it) =>
        it.id === action.id ? { ...it, qty: action.qty } : it
      );
    case CartAction.RESET:
      return [];
    default:
      return state;
  }
}
