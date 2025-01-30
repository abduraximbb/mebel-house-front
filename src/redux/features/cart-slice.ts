import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICartProduct extends IProduct {
  amount: number;
}

export interface CartState {
  value: ICartProduct[];
}

const cartStore = localStorage.getItem("cart");
const initialState: CartState = {
  value: cartStore ? JSON.parse(cartStore) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<IProduct>) {
      let index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < 0) {
        state.value.push({ ...action.payload, amount: 1 });
        localStorage.setItem("cart", JSON.stringify(state.value));
      }
    },
    deleteCart() {},
    incrementAmountCart(state, action: PayloadAction<IProduct>) {
      let index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value = state.value.map((item, inx) =>
        index === inx ? { ...item, amount: item.amount + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    decrementAmountCart(state, action: PayloadAction<IProduct>) {
      let index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value = state.value.map((item, inx) =>
        index === inx ? { ...item, amount: item.amount - 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    clearCart() {},
  },
});

export const {
  addCart,
  incrementAmountCart,
  clearCart,
  decrementAmountCart,
  deleteCart,
} = cartSlice.actions;
export default cartSlice.reducer;
