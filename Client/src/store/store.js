import { configureStore } from '@reduxjs/toolkit'
import {productReducer, cartReducer, userReducer, orderReducer} from '../features'
export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
  },
})