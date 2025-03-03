const { logger } = require("../../../helpers/logger");

const orderDao = (model) => {
    const { orderModel } = model
    return {
        saveOrder: async (Order, user) => {
            try {
                const order = new orderModel({
                    buyer: user.username,
                    total: Order.reduce((totalAcum, { total }) => totalAcum + total, 0),
                    items: Order,
                    date: new Date().toLocaleString(),
                    email: user.email,
                    status: 'pending'
                });
                const savedOrder = await order.save();
                logger.info(`New order created: ${savedOrder._id} by ${user.username}`);
                return savedOrder;
            } catch (error) {
                logger.error(`Failed to save order: ${error.message}`);
                throw new Error(`Failed to save order: ${error.message}`);
            }
        },
        
        listAllOrder: async (user) => {
            try {
                if (user.role === "admin") {
                    const orders = await orderModel.find({}).lean();
                    logger.info(`Admin retrieved all orders: ${orders.length} found`);
                    return orders;
                } else {
                    const orders = await orderModel.find({ buyer: user.username }).lean();
                    logger.info(`User ${user.username} retrieved their orders: ${orders.length} found`);
                    return orders;
                }
            } catch (error) {
                logger.error(`Failed to list orders: ${error.message}`);
                throw new Error(`Failed to list orders: ${error.message}`);
            }
        },

        listOrderById: async (id) => {
            try {
                const order = await orderModel.findById(id).lean();
                if (!order) {
                    logger.warn(`Order not found with ID: ${id}`);
                    return null;
                }
                logger.info(`Order retrieved: ${id}`);
                return order;
            } catch (error) {
                logger.error(`Failed to find order by ID: ${error.message}`);
                throw new Error(`Failed to find order by ID: ${error.message}`);
            }
        },
        
        deleteOrderById: async (id) => {
            try {
                const result = await orderModel.deleteOne({ _id: id });
                if (result.deletedCount === 0) {
                    logger.warn(`No order found to delete with ID: ${id}`);
                    return false;
                }
                logger.info(`Order deleted: ${id}`);
                return true;
            } catch (error) {
                logger.error(`Failed to delete order: ${error.message}`);
                throw new Error(`Failed to delete order: ${error.message}`);
            }
        },
        
        updateOrder: async (id, status) => {
            try {
                const orderUpdate = await orderModel.findById(id);
                if (!orderUpdate) {
                    logger.warn(`No order found to update with ID: ${id}`);
                    return null;
                }
                orderUpdate.status = status;
                const updatedOrder = await orderUpdate.save();
                logger.info(`Order ${id} status updated to: ${status}`);
                return updatedOrder;
            } catch (error) {
                logger.error(`Failed to update order: ${error.message}`);
                throw new Error(`Failed to update order: ${error.message}`);
            }
        },
        
        deleteAllOrder: async () => {
            try {
                const result = await orderModel.deleteMany({});
                logger.info(`All orders deleted: ${result.deletedCount} records removed`);
                return result.deletedCount;
            } catch (error) {
                logger.error(`Failed to delete all orders: ${error.message}`);
                throw new Error(`Failed to delete all orders: ${error.message}`);
            }
        }
    }
}

module.exports = orderDao;