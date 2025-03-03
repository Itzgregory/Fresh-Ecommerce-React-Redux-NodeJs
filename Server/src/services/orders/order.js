const { logger } = require("../../helpers/logger");

const orderServices = (Dao) => {
    const { orderDao } = Dao;

    return {
        saveOrder: async (orderItems, user) => {
            try {
                if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
                    throw new Error("Invalid order: must contain at least one item");
                }
                
                const calculatedTotal = orderItems.reduce((total, item) => {
                    return total + (Number(item.price) * Number(item.quantity));
                }, 0);
                
                const itemsTotal = orderItems.reduce((total, item) => total + Number(item.total), 0);
                if (Math.abs(calculatedTotal - itemsTotal) > 0.01) {
                    logger.warn(`Order total mismatch: calculated ${calculatedTotal}, provided ${itemsTotal}`);
                }
                
                const savedOrder = await orderDao.saveOrder(orderItems, user);
                return savedOrder;
            } catch (error) {
                logger.error(`Order service - saveOrder error: ${error.message}`);
                throw error;
            }
        },
        
        listAllOrder: async (user) => {
            try {
                if (!user || !user.username) {
                    throw new Error("Invalid user information");
                }
                
                return await orderDao.listAllOrder(user);
            } catch (error) {
                logger.error(`Order service - listAllOrder error: ${error.message}`);
                throw error;
            }
        },
        
        listOrderById: async (id) => {
            try {
                if (!id) {
                    throw new Error("Order ID is required");
                }
                
                const order = await orderDao.listOrderById(id);
                return order;
            } catch (error) {
                logger.error(`Order service - listOrderById error: ${error.message}`);
                throw error;
            }
        },
        
        deleteOrderById: async (id) => {
            try {
                if (!id) {
                    throw new Error("Order ID is required");
                }
                
                const result = await orderDao.deleteOrderById(id);
                return result;
            } catch (error) {
                logger.error(`Order service - deleteOrderById error: ${error.message}`);
                throw error;
            }
        },
        
        updateOrder: async (id, status) => {
            try {
                if (!id) {
                    throw new Error("Order ID is required");
                }
                
                if (!status) {
                    throw new Error("Order status is required");
                }
                
                const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
                if (!validStatuses.includes(status)) {
                    throw new Error(`Invalid status: must be one of ${validStatuses.join(', ')}`);
                }
                
                const updatedOrder = await orderDao.updateOrder(id, status);
                return updatedOrder;
            } catch (error) {
                logger.error(`Order service - updateOrder error: ${error.message}`);
                throw error;
            }
        },
        
        deleteAllOrder: async () => {
            try {
                const result = await orderDao.deleteAllOrder();
                return result;
            } catch (error) {
                logger.error(`Order service - deleteAllOrder error: ${error.message}`);
                throw error;
            }
        }
    };
};

module.exports = orderServices;