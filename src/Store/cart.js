import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
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

      console.log(existingItem);
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

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
