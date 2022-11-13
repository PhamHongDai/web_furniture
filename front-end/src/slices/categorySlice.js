import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../apis/categoryApi";

export const getCategories = createAsyncThunk("category/getCategories", async (rejectWithValue) => {
    try{
        const response = await categoryApi.getCategories();
        return response;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
});

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.loading = true;
        },
        [getCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
        },
    }
});

export default categorySlice.reducer;