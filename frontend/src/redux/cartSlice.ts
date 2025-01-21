import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { type CartItemT } from "../lib/types";

//added cart to local storage
const saveCartToLocalStorage = (
  cartState: ReturnType<typeof cartAdapter.getInitialState>,
) => {
  localStorage.setItem("cart", JSON.stringify(cartState));
};

//load cart data from local storage if exist
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return {
    subtotal: 0,
    total: 0,
    itemsInCart: 0,
    entities: {},
    ids: [],
  };
};

const cartAdapter = createEntityAdapter({
  selectId: (product: CartItemT) => product.id,
});

const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState(loadCartFromLocalStorage()),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemT>) => {
      const item = action.payload;
      const existingItem = state.entities[item.id]; //assign if item already exist

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + item.quantity;
        const updatedPurchaseSubtotal = updatedQuantity * item.price;
        state.subtotal = Number(
          (state.subtotal + item.purchaseTotal).toFixed(2),
        ); //update total price
        state.itemsInCart = item.quantity + state.itemsInCart;

        // if item exist update pieces
        cartAdapter.updateOne(state, {
          id: item.id,
          changes: {
            quantity: updatedQuantity,
            purchaseTotal: updatedPurchaseSubtotal,
          },
        });
      } else {
        cartAdapter.addOne(state, item); //add new item with modified data
        state.subtotal = Number(
          (state.subtotal + item.purchaseTotal).toFixed(2),
        ); //update total price
        state.itemsInCart = item.quantity + state.itemsInCart;
      }
      saveCartToLocalStorage(state);
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: number; changes: Partial<CartItemT> }>,
    ) => {
      const { id, changes } = action.payload;
      const existingItem = state.entities[id]; //check if item already exist

      if (existingItem) {
        //calculate the difference in quantity (in case the product quantity changes)
        const amountDifference = changes.quantity
          ? changes.quantity - existingItem.quantity
          : 0;

        const updatedItemPrice =
          existingItem.purchaseTotal + existingItem.price * amountDifference;
        existingItem.purchaseTotal = parseFloat(updatedItemPrice.toFixed(2));

        const updatedTotal =
          state.subtotal + existingItem.price * amountDifference;
        state.subtotal = parseFloat(updatedTotal.toFixed(2));

        existingItem.quantity = changes.quantity ?? existingItem.quantity; //update product amount

        state.itemsInCart += amountDifference;
      }
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToRemove = state.entities[itemId]; //check if item already exist

      if (itemToRemove) {
        state.subtotal = Number(
          (state.subtotal - itemToRemove.purchaseTotal).toFixed(2), // update total price
        );
        state.itemsInCart -= itemToRemove.quantity; //update quantity
      }
      cartAdapter.removeOne(state, itemId);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      cartAdapter.removeAll(state);
      state.subtotal = 0;
      state.total = 0;
      state.itemsInCart = 0;

      localStorage.removeItem("cart");
    },
    addTotalPrice: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  updateCart,
  removeFromCart,
  addTotalPrice,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const { selectAll: selectAllCart } = cartAdapter.getSelectors(
  (state: RootState) => state.cart,
);
