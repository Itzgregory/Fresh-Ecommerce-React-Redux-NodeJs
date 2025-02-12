const orderServices = (Dao) => {
    const { orderDao } = Dao

    return {
        saveOrder: async (Order, user, idOrder, totalOrder) => {
            return orderDao.saveOrder(Order, user, idOrder, totalOrder)
        },
        listAllOrder: async (user) => {
            return orderDao.listAllOrder(user)
        },
        listOrderById: async (id) => {
            return orderDao.listOrderById(id)
        },
        deleteOrderById: async (id) => {
            return orderDao.deleteOrderById(id)
        },
        updateOrder: async (id, data) => {
            return orderDao.updateOrder(id, data)
        },
        deleteAllOrder: async () => {
            return orderDao.deleteAllOrder()
        }
    }
}

module.exports = orderServices