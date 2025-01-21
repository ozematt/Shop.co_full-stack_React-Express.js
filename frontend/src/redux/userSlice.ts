import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type OrderData, type UserInitialState } from "../lib/types";

const initialState: UserInitialState = { username: null, orders: [] };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logOutUser: (state) => {
      state.username = null;
    },
    addOrder: (state, action: PayloadAction<OrderData[]>) => {
      state.orders = [...state.orders, ...action.payload];
    },
  },
});
export const { logUser, logOutUser, addOrder } = userSlice.actions;

export default userSlice.reducer;
