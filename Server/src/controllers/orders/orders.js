const { logger } = require("../../helpers/logger");
const { orderValidation } = require('../../helpers/validation/orderValidation/orderValidation');

const ordersControllers = (service, sendMail) => {
    const { orderServices, cartServices, productServices } = service;
    
    return {
        saveOrder: async (req, res) => {
            try {
                const { error } = orderValidation.createOrder().validate(req.body);
                if (error) {
                    logger.warn(`Order validation failed: ${error.message}`);
                    return res.status(400).json({
                        success: false,
                        message: error.details.map(err => err.message).join(', '),
                        data: null
                    });
                }
                
                const orderItems = req.body;
                const user = req.user;
                
                for (const item of orderItems) {
                    const product = await productServices.getProductById(item.productId);
                    if (!product) {
                        return res.status(404).json({
                            success: false,
                            message: `Product not found: ${item.productId}`,
                            data: null
                        });
                    }
                    
                    if (product.stock < item.quantity) {
                        return res.status(400).json({
                            success: false,
                            message: `Insufficient stock for product: ${product.name}`,
                            data: null
                        });
                    }
                    
                    await productServices.updateProductStock(
                        item.productId, 
                        -item.quantity
                    );
                }
                
                const order = await orderServices.saveOrder(orderItems, user);
                
                await sendMail(order);
                
                await cartServices.deleteAllProductsCart(user.username);
                
                logger.info(`Order created successfully: ${order._id}`);
                return res.status(201).json({
                    success: true,
                    message: "Order created successfully",
                    data: { orderId: order._id }
                });
            } catch (error) {
                logger.error(`Order creation error: ${error.message}`);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: null
                });
            }
        },
        
        listAllOrder: async (req, res) => {
            try {
                const user = req.user;
                const list = await orderServices.listAllOrder(user);
                
                return res.status(200).json({
                    success: true,
                    message: "Orders retrieved successfully",
                    data: list
                });
            } catch (error) {
                logger.error(`Error listing orders: ${error.message}`);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: null
                });
            }
        },
        
        listOrderById: async (req, res) => {
            try {
                const id = req.params.id;
                const order = await orderServices.listOrderById(id);
                
                if (!order) {
                    return res.status(404).json({
                        success: false,
                        message: `Order not found with ID: ${id}`,
                        data: null
                    });
                }
                
                return res.status(200).json({
                    success: true,
                    message: "Order retrieved successfully",
                    data: order
                });
            } catch (error) {
                logger.error(`Error retrieving order: ${error.message}`);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: null
                });
            }
        },
        
        updateOrder: async (req, res) => {
            try {
                const id = req.params.id;
                
                const { error } = orderValidation.updateOrder().validate(req.body);
                if (error) {
                    logger.warn(`Order update validation failed: ${error.message}`);
                    return res.status(400).json({
                        success: false,
                        message: error.details.map(err => err.message).join(', '),
                        data: null
                    });
                }
                
                const updatedOrder = await orderServices.updateOrder(id, req.body.status);
                
                if (!updatedOrder) {
                    return res.status(404).json({
                        success: false,
                        message: `Order not found with ID: ${id}`,
                        data: null
                    });
                }
                
                logger.info(`Order ${id} updated successfully to status: ${req.body.status}`);
                return res.status(200).json({
                    success: true,
                    message: `Order status updated to ${req.body.status}`,
                    data: updatedOrder
                });
            } catch (error) {
                logger.error(`Error updating order: ${error.message}`);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: null
                });
            }
        },
        
        deleteOrderById: async (req, res) => {
            try {
                const id = req.params.id;
                const result = await orderServices.deleteOrderById(id);
                
                if (!result) {
                    return res.status(404).json({
                        success: false,
                        message: `Order not found with ID: ${id}`,
                        data: null
                    });
                }
                
                logger.info(`Order ${id} deleted successfully`);
                return res.status(200).json({
                    success: true,
                    message: "Order deleted successfully",
                    data: null
                });
            } catch (error) {
                logger.error(`Error deleting order: ${error.message}`);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: null
                });
            }
        },
        
        deleteAllOrder: async (req, res) => {
            try {
                if (req.user.role !== 'admin') {
                    logger.warn(`Non-admin user ${req.user.username} attempted to delete all orders`);
                    return res.status(403).json({
                        success: false,
                        message: "Forbidden: You do not have admin privileges",
                        data: null
                    });
                }
                
                const count = await orderServices.deleteAllOrder();
                
                logger.info(`All orders deleted by admin ${req.user.username}`);
                return res.status(200).json({
                    success: true,
                    message: `All orders deleted successfully (${count} orders removed)`,
                    data: null
                });
            } catch (error) {
                logger.error(`Error deleting all orders: ${error.message}`);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: null
                });
            }
        }
    };
};

module.exports = ordersControllers;