import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsSliceReducer from "./productsSlice";
import cartSliceReducer from "./cartSlice";
import userSliceReducer from "./userSlice";

const store = configureStore({
  reducer: {
    products: productsSliceReducer,
    cart: cartSliceReducer,
    user: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
