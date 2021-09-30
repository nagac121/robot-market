import { createSlice } from "@reduxjs/toolkit";

const roboSlice = createSlice({
  name: "robo",
  initialState: {
    items: [],
    cartItems: [],
    materialList: []
  },
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload.cartItems);
    },
    replaceRobo(state, action) {
      state.items = action.payload.items;
    },
    materialList(state,action) {
      state.materialList = action.payload.materialList;
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
  },
});

export const roboActions = roboSlice.actions;
export default roboSlice;
