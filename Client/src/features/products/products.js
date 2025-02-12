import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listProducts, listById } from '../../api';

const initialState = {
    loading: false,
    products: [],
    productById: null,
    error: ''
};

export const getProducts = createAsyncThunk('GET_PRODUCTS_LIST', async (id, { rejectWithValue }) => {
    try {
        const response = await listProducts(id);
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
});

export const getProductsById = createAsyncThunk('GET_PRODUCTS_BY_ID', async (id, { rejectWithValue }) => {
    try {
        const response = await listById(id);
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch product details");
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        /*--------  Get All Products    ----------*/
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload) ? action.payload : []; 
            state.error = '';
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.payload || 'Error fetching products';
        });

        /*--------  Get Product By ID    ----------*/
        builder.addCase(getProductsById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductsById.fulfilled, (state, action) => {
            state.loading = false;
            state.productById = action.payload || null; 
            state.error = '';
        });
        builder.addCase(getProductsById.rejected, (state, action) => {
            state.loading = false;
            state.productById = null;
            state.error = action.payload || 'Error fetching product details';
        });
    }
});

export const productReducer = productSlice.reducer;
