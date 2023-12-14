import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
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
          price: Number(existingItem.price) + Number(action.payload.price),
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
        price: existingItem.price + action.payload.price,
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
        price:
          existingItem.price - action.payload.price / existingItem.quantity,
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

export default store;
