import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listProductCart, addProductToCart, deleteProductCart, updateCart } from '../../api';

const initialState = {
    loading: false,
    products: [],
    error: ''
}

export const getProductsCart = createAsyncThunk('GET_PRODUCTS_CART', async () => {
    const query = await listProductCart()
    return query
})

export const addProduct =  createAsyncThunk('ADD_PRODUCT_CART', async (data) => {
    return await addProductToCart(data)
})

export const deleteProduct = createAsyncThunk('DELETE_PRODUCT_CART', async (data) => {
    return await deleteProductCart(data)
})

export const updateProduct = createAsyncThunk('UPDATE_PRODUCT_CART', async (data) => {
    return await updateCart(data)
})

export const ereaseCart = createAsyncThunk('EREASE_CART', async()=> {
    return []
})


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        //------ Get List Cart --------//
        builder.addCase(getProductsCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProductsCart.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload || []
            state.error = ''
        })
        builder.addCase(getProductsCart.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
        //------ Add one product to the list Cart --------//

        builder.addCase(addProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.find(product => product.idProduct === action.payload.idProduct) ? state.products.map(product => product.idProduct === action.payload.idProduct ? { ...product, Qty: action.payload.Qty, total: action.payload.total } : product) : state.products.concat(action.payload)
            state.error = ''
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false
            state.products = [...state.products]
            state.error = action.error.message
        })

        //------ Delete one product of the list Cart --------//
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.filter(item => item.idProduct !== action.payload.idProduct)
            state.error = ''
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.products = [...state.products]
            state.error = action.error.message
        })

        //------ Update one product of the list Cart --------//
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.map(product => product.idProduct === action.payload.idProduct ? { ...product, Qty: action.payload.Qty, total: action.payload.total }: product)
            state.error = ''
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.products = [...state.products]
            state.error = action.error.message
        })

        //------ Erease all products of the cart, after the purchase has been perform --------//
        builder.addCase(ereaseCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(ereaseCart.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(ereaseCart.rejected, (state, action) => {
            state.loading = false
            state.products = [...state.products]
            state.error = action.error.message
        })





    }
})
export const cartReducer = cartSlice.reducer