import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../apis/cartApi";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await cartApi.getCartItems();
  return response;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItems, thunkAPI) => {
    const response = await cartApi.addToCart(cartItems);
    await thunkAPI.dispatch(getCartItems());
    return response;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItem, thunkAPI) => {
    const response = await cartApi.removeCartItem(cartItem);
    await thunkAPI.dispatch(getCartItems());
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.data.cart.cartItems;
    },
    [getCartItems.pending]: (state) => {
      state.loading = true;
    },
    [getCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.data.cart.cartItems;
    },
    [removeCartItem.pending]: (state) => {
      state.loading = true;
    },
    [removeCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [removeCartItem.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export default cartSlice.reducer;
