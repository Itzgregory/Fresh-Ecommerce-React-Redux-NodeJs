const cartServices = (Dao) => {
    
    const { cartDao } = Dao 

    return {
        cartList: async (username) => {
            return cartDao.cartList(username)
        },
        saveOrUpdateCart: async(data, user) => {
         return cartDao.saveOrUpdateCart(data, user)
        },
        deleteProductCart: async(id) => {
            return cartDao.deleteProductCart(id)
        },
        deleteAllProductsCart: async(username) =>{
            return cartDao.deleteAllProductsCart(username)
        },
        listById: async(id, username) =>{
            return cartDao.listById(id, username)
        },
        updateProductCart: async(data) => {
            return cartDao.updateProductCart(data)
        }
    }

}


module.exports = cartServices