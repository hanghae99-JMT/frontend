import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import restaurantSlice from "./modules/restaurantSlice";

const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    user: userReducer
  },
});

export default store;
