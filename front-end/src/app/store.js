import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import addressReducer from "../slices/addressSlice";
import productReducer from "../slices/productSlice";
import categoryReducer from "../slices/categorySlice";
import cartReducer from "../slices/cartSlice";
import userReducer from "../slices/userSlice";
import orderReducer from "../slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
    product: productReducer,
    category: categoryReducer,
    user: userReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
