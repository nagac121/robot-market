import { configureStore } from "@reduxjs/toolkit";

import roboSlice from "./robo-slice";

const store = configureStore({
  reducer: { robo: roboSlice.reducer },
});

export default store;
