import { createSlice } from "@reduxjs/toolkit";

const roboSlice = createSlice({
  name: "robo",
  initialState: {
    items: [],
  },
  reducers: {
    replaceRobo(state, action) {
      console.log("prevState: ", state, "action: ", action.payload);
      state.items = action.payload.items;
    },
  },
});

export const roboActions = roboSlice.actions;
export default roboSlice;
