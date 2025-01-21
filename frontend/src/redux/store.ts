import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsSliceReducer from "./productsSlice";
import cartSliceReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsSliceReducer,
    cart: cartSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
