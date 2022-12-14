import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "../apis/orderApi";
import { getCartItems } from "./cartSlice";

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (rejectWithValue) => {
    try {
      const response = await orderApi.getAllOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrdersByUser = createAsyncThunk(
  "order/getOrdersByUser",
  async (rejectWithValue) => {
    try {
      const response = await orderApi.getOrdersByUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/add",
  async (order, thunkAPI, rejectWithValue) => {
    try {
      const response = await orderApi.addOrder(order);
      await thunkAPI.dispatch(getCartItems());
      await thunkAPI.dispatch(getOrdersByUser());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatus = createAsyncThunk("product/update", async(status, { rejectWithValue }) => {
  try {
      const response = await orderApi.updateStatus(status);
      return response;
  }
  catch (error) {
      return rejectWithValue(error.response.data);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: {},
    loading: false,
    error: null,
  },
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.loading = true;
    },
    [addOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload.data.order;
    },
    [getOrdersByUser.pending]: (state) => {
      state.loading = true;
    },
    [getOrdersByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getOrdersByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data.orders;
    },
    [getAllOrders.pending]: (state) => {
      state.loading = true;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data.orders;
    },
    [updateStatus.pending]: (state) => {
      state.loading = true;
    },
    [updateStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data.orders;
    },
  },
});

export default orderSlice.reducer;
