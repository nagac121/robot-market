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
      let updatedItem = {};
      // update qty of added Item
      state.items.forEach((item) => {
        if (item.createdAt === action.payload.addedItem.createdAt) {
          item.qty++;
          item.stock--;
          updatedItem = { ...item };
        }
      });
      // add item to cart with qty 1
      if (updatedItem.qty === 1) {
        state.cartItems.push(updatedItem);
      } else {
        // update qty in cart items
        state.cartItems.forEach((element) => {
          if (element.createdAt === updatedItem.createdAt) {
            element.qty++;
          }
        });
      }
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
  },
});

export const roboActions = roboSlice.actions;
export default roboSlice;
