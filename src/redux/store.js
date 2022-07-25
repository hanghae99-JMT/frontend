import { configureStore } from "@reduxjs/toolkit";
import restaurantSlide from "./modules/restaurantSlice";

const store = configureStore({
  reducer: {
    restaurant: restaurantSlide,
  },
});

export default store;
