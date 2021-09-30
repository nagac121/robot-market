import { createSlice } from "@reduxjs/toolkit";

const roboSlice = createSlice({
  name: "robo",
  initialState: {
    cartItems: [],
    filteredItems: [],
    filterValue: "",
    items: [],
    materialList: [],
  },
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload.cartItems);
    },
    filterItems(state, action) {
      state.filteredItems = state.items.filter(
        (item) => item.material === action.payload.filterValue
      );
    },
    filterValue(state, action) {
      state.filterValue = action.payload.filterValue;
    },
    replaceRobo(state, action) {
      state.items = action.payload.items;
    },
    materialList(state, action) {
      state.materialList = action.payload.materialList;
    },
    updateStock(state, action) {
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
