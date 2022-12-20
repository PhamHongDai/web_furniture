import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../apis/productApi";

export const getProducts = createAsyncThunk("product/getProducts", async (rejectWithValue) => {
    try {
        const response = await productApi.getProducts();
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProductsDisable = createAsyncThunk("product/getProductsDisable", async (rejectWithValue) => {
    try {
        const response = await productApi.getProductsDisable();
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProductBySlug = createAsyncThunk("product/getProductBySlug", async (slug, rejectWithValue) => {
    try {
        const response = await productApi.getProductBySlug(slug);
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addProductReview = createAsyncThunk("product/addProductReview", async(review,  { rejectWithValue } ) => {
    try{
      const response = await productApi.addProductReview(review);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
});

export const setDisableProduct = createAsyncThunk("product/setDisableProduct", async(productId,  { rejectWithValue }) => {
    try {
        const response = await productApi.setDisableProduct(productId);
        // await thunkAPI.dispatch(getProducts());
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const setDisableProductFasle = createAsyncThunk("product/setDisableProductFasle", async(productId,  { rejectWithValue }) => {
    try {
        const response = await productApi.setDisableProductFasle(productId);
        // await thunkAPI.dispatch(getProducts());
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProduct = createAsyncThunk("product/update", async(product, { rejectWithValue }) => {
    try {
        const response = await productApi.updateProduct(product);
        // await thunkAPI.dispatch(getProducts());
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addProduct = createAsyncThunk("product/add", async(product,  { rejectWithValue } ) => {
    try {
        const response = await productApi.addProduct(product);
        // await thunkAPI.dispatch(getProducts());
        return response;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        productDetail: {},
        search: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true;
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
        },
        [getProductsDisable.pending]: (state) => {
            state.loading = true;
        },
        [getProductsDisable.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getProductsDisable.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
        },
        [setDisableProductFasle.pending]: (state) => {
            state.loading = true;
        },
        [setDisableProductFasle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [setDisableProductFasle.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
        },
        [getProductBySlug.pending]: (state) => {
            state.loading = true;
        },
        [getProductBySlug.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getProductBySlug.fulfilled]: (state, action) => {
            state.loading = false;
            state.productDetail = action.payload.data.product;
        },
        [addProductReview.pending]: (state) => {
            state.loading = true;
        },
        [addProductReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [addProductReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.productDetail = action.payload.data.product;
        },
        [setDisableProduct.pending]: (state) => {
            state.loading = true;
        },
        [setDisableProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [setDisableProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
        },
        
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
        },
        [addProduct.pending]: (state) => {
            state.loading = true;
        },
        [addProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
        },
    }
});

export default productSlice.reducer;