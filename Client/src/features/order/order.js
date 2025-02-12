import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listAllOrders, updateOrder } from '../../api';

const initialState = {
    loading: false,
    orders: [],
    error: ''
}

export const getAllOrders = createAsyncThunk('LIST_ALL_ORDERS', async()=> {
    return await listAllOrders()
})

export const updateStatusOrder = createAsyncThunk('UPDATE_ORDERS', async(data)=> {
    return await updateOrder(data)
})

export const filterStatus = createAsyncThunk('FILTER_ORDERS', async(filter) =>{
    if(filter ==="All"){
        return await listAllOrders()
    }else{
        const orders = await listAllOrders().then(resp => resp.filter(item => item.status === filter))
        return orders  
    }
})

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {

        //------ Get List of orders --------//
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload || []
            state.error = ''
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false
            state.orders = []
            state.error = action.error.message
        })
        //------ Update Status Order --------//
        builder.addCase(updateStatusOrder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orders = state.orders.map(order => order._id === action.payload._id ? {...order, status: action.payload.status}: order)
            state.error = ''
        })
        builder.addCase(updateStatusOrder.rejected, (state, action) => {
            state.loading = false
            state.orders = []
            state.error = action.error.message
        })
         //------ Filter Orders --------//
         builder.addCase(filterStatus.pending, (state) => {
            state.loading = true
        })
        builder.addCase(filterStatus.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
            state.error = ''
        })
        builder.addCase(filterStatus.rejected, (state, action) => {
            state.loading = false
            state.orders = []
            state.error = action.error.message
        })

    }
})
export const orderReducer = orderSlice.reducer