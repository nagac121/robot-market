import { createSlice } from "@reduxjs/toolkit";

const roboSlice = createSlice({
  name: "robo",
  initialState: {
    items: [],
    cartItems: [],
  },
  reducers: {
    replaceRobo(state, action) {
      state.items = action.payload.items;
    },
    updateItems(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.createdAt === newItem.createdAt
      );
      if (existingItem) {
        existingItem.stock = existingItem.stock--;
      }
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload.cartItems);
    },
  },
});

export const roboActions = roboSlice.actions;
export default roboSlice;
