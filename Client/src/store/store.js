import { configureStore } from '@reduxjs/toolkit';

// Imported reducers individually to avoid circular dependencies
import { productReducer } from '../features/products/products';
import { cartReducer } from '../features/cart/cart';
import { userReducer } from '../features/user/user';
import { orderReducer } from '../features/order/order';

console.log("Before loading state...");

const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
const activeUserId = localStorage.getItem('activeUser') || null;

const preloadedState = {
  user: {
    loading: false,
    User: activeUserId ? storedUsers[activeUserId] : null,
    activeUserId: activeUserId,
    users: storedUsers,
    error: ''
  }
};

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
  },
  preloadedState
});

console.log("Redux store initialized:", store.getState());

export default store;