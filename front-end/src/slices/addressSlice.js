import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressApi from "../apis/addressApi";

export const getUserAddress = createAsyncThunk("deliveryInfo/get", async ( rejectWithValue ) => {
  try{
    const response = await addressApi.getAddress();
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const addAddress = createAsyncThunk("deliveryInfo/add", async(address, rejectWithValue) => {
  try{
    const response = await addressApi.addAddress(address);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const deleteAddress = createAsyncThunk("deliveryInfo/delete", async(address, rejectWithValue) => {
  try{
    const response = await addressApi.deleteAddress(address);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const setDefaultDeliveryInfoAddress = createAsyncThunk("deliveryInfo/setDefaultDeliveryInfo", async(address , rejectWithValue) => {
  try {
    const response = await addressApi.setDefaultDeliveryInfo(address);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const addressSlice = createSlice({
  name: "address",
  initialState: {
    deliveryInfo: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getUserAddress.pending]: (state) => {
      state.loading = true;
    },
    [getUserAddress.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getUserAddress.fulfilled]: (state, action) => {
      state.loading = false;
      state.deliveryInfo = action.payload.data.deliveryInfo;
    },
    [addAddress.pending]: (state) => {
      state.loading = true;
    },
    [addAddress.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [addAddress.fulfilled]: (state, action) => {
      state.loading = false;
      state.deliveryInfo = action.payload.data.deliveryInfo;
    },
    [deleteAddress.pending]: (state) => {
      state.loading = true;
    },
    [deleteAddress.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      state.loading = false;
      state.deliveryInfo = action.payload.data.deliveryInfo;
    },
    [setDefaultDeliveryInfoAddress.pending]: (state) => {
      state.loading = true;
    },
    [setDefaultDeliveryInfoAddress.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [setDefaultDeliveryInfoAddress.fulfilled]: (state, action) => {
      state.loading = false;
      state.deliveryInfo = action.payload.data.deliveryInfo;
    },
  },
});

export default addressSlice.reducer;
