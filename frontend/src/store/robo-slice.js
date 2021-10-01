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
      const userAction = action.payload.userAction;
      // update qty of added Item
      state.items.forEach((item) => {
        if (item.createdAt === action.payload.item.createdAt) {
          if (userAction === "add") {
            item.qty++;
            item.stock--;
          } else {
            // userAction === "remove"
            item.qty--;
            item.stock++;
          }
          updatedItem = { ...item };
        }
      });
      // add item to cart with qty 1
      const actionQtyCheck =
        (userAction === "add" && updatedItem.qty === 1) ||
        (userAction === "remove" && updatedItem.qty === 0)
          ? true
          : false;
      if (actionQtyCheck) {
        if (userAction === "add") {
          state.cartItems.push(updatedItem);
        } else {
          // userAction === "remove"
          state.cartItems = state.cartItems.filter(
            (element) => element.createdAt !== updatedItem.createdAt
          );
        }
      } else {
        // update cart items
        state.cartItems.forEach((element) => {
          if (element.createdAt === updatedItem.createdAt) {
            if (userAction === "add") {
              element.qty++;
              element.stock--;
            } else {
              // userAction === "remove"
              element.qty--;
              element.stock++;
            }
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
