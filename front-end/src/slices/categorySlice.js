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

export const addCategories = createAsyncThunk("category/add", async(category, { rejectWithValue } ) => {
    try {
        const response = await categoryApi.addCategories(category);
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateCategories = createAsyncThunk("category/update", async(category, { rejectWithValue } ) => {
    try {
        const response = await categoryApi.updateCategories(category);
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const setDisableCategories = createAsyncThunk("category/update", async(id, { rejectWithValue } ) => {
    try {
        const response = await categoryApi.setDisableCategories(id);
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getCategoryDisabled = createAsyncThunk("category/getCategoriesDisable", async (rejectWithValue) => {
    try{
        const response = await categoryApi.getCategoryDisabled();
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
        [addCategories.pending]: (state) => {
            state.loading = true;
        },
        [addCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [addCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
        },
        [updateCategories.pending]: (state) => {
            state.loading = true;
        },
        [updateCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [updateCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
        },
        [setDisableCategories.pending]: (state) => {
            state.loading = true;
        },
        [setDisableCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [setDisableCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
        },
        [getCategoryDisabled.pending]: (state) => {
            state.loading = true;
        },
        [getCategoryDisabled.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getCategoryDisabled.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
        },
    }
});

export default categorySlice.reducer;