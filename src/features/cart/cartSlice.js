import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        cartReducer.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  clearCart,
} = cartReducer.actions;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, next) => sum + next.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, next) => sum + next.totalPrice, 0);

export const getCurrentItemQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCart = (state) => state.cart.cart;

export default cartReducer.reducer;
