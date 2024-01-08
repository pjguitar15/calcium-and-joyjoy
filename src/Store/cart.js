import { configureStore, createSlice } from "@reduxjs/toolkit";

// Save state to local storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch(e) {
    console.error('Could not save state', e);
  }
};

// Load state from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch(e) {
    console.error('Could not load state', e);
    return undefined;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage() || [], // Load the state from local storage
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        const existingIndex = state.indexOf(existingItem);
        state[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
      } else state.push(action.payload);
    },
    clearCart(state) {
      return (state = []);
    },
    addOneMore(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      const existingIndex = state.indexOf(existingItem);
      state[existingIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    },

    subtractOne(state, action) {
      const existingItem = state.find((item) => item.id == action.payload.id);
      const existingIndex = state.indexOf(existingItem);

      if (existingItem.quantity === 1)
        return (state = state.filter((item) => item.id !== action.payload.id));
      state[existingIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
    },
  },
});

export const { addToCart, clearCart, addOneMore, subtractOne } =
  cartSlice.actions;

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: [],
  reducers: {
    // Add checkout-related actions here...
    // For example:
    addToCheckout(state, action) {
      state.push(action.payload);
    },
    clearCheckout(state) {
      return (state = []);
    },
    // ... add more actions as needed ...
  },
});

export const { addToCheckout, clearCheckout } = checkoutSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
});

// Subscribe to store changes to save the state to local storage
store.subscribe(() => {
  saveToLocalStorage(store.getState().cart);
});

export default store;
