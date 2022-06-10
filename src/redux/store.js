import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import food from "./slices/foodSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    food,
  },
});
