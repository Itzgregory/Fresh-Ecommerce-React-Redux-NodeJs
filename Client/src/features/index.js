//I expereiced a circular depency thats why inadoptefd this approach
import { 
    productReducer,
    getProducts,
    getProductsById,
} from './products/products';
  
import {
    cartReducer,
    addProduct,
    deleteProduct,
    updateProduct,
    ereaseCart,
    getProductsCart,
} from './cart/cart';
  
import { 
    userReducer, 
    switchActiveUser, 
    authenticateUser, 
    logoutUserStatus, 
    getUserLoginStatus,
} from './user/user';
  
import {
    orderReducer,
    getAllOrders,
    updateStatusOrder,
    filterStatus,
} from './order/order';
  
export {
    productReducer,
    cartReducer,
    userReducer,
    orderReducer
};
  
export {
    getProducts,
    getProductsById
};
  
export {
    addProduct,
    deleteProduct,
    updateProduct,
    ereaseCart,
    getProductsCart
};
  
export {
    switchActiveUser,
    authenticateUser,
    logoutUserStatus,
    getUserLoginStatus
};
  
export {
    getAllOrders,
    updateStatusOrder,
    filterStatus
};