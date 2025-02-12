const validationConfig = {
    formatResponse: (success, message, data = null) => {
        return {
            success,
            message,
            data,
            status: success ? 200 : 400 
        };
    },
    
    validatePrice: (price) => {
        if (price < 0.01) {
            return {
                success: false,
                message: 'Product price must be at least 0.01',
                data: null
            };
        }
        return { success: true };
    },

    validateStock: (stock) => {
        if (stock < 0) {
            return {
                success: false,
                message: 'Product stock cannot be negative',
                data: null
            };
        }
        return { success: true };
    },

    validateStockAvailability: (available, requested) => {
        if (available < requested) {
            return {
                success: false,
                message: 'Insufficient stock',
                data: null
            };
        }
        return { success: true };
    },

    validateUniqueCode: async (dao, code, existingProductId = null) => {
        try {
            const existingProduct = await dao.findByCode(code);
            if (existingProduct && existingProduct._id.toString() !== existingProductId) {
                return {
                    success: false,
                    message: 'Product code already exists',
                    data: null
                };
            }
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: `Error checking product code: ${error.message}`,
                data: null
            };
        }
    },

    validateProduct: async (dao, product, isUpdate = false) => {
        try {
            if (product.price !== undefined) {
                const priceValidation = validationConfig.validatePrice(product.price);
                if (!priceValidation.success) return priceValidation;
            }

            if (product.stock !== undefined) {
                const stockValidation = validationConfig.validateStock(product.stock);
                if (!stockValidation.success) return stockValidation;
            }

            if (product.code) {
                const codeValidation = await validationConfig.validateUniqueCode(
                    dao, 
                    product.code, 
                    isUpdate ? product._id : null
                );
                if (!codeValidation.success) return codeValidation;
            }

            return validationConfig.formatResponse(true, 'Validation successful');
        } catch (error) {
            return validationConfig.formatResponse(false, error.message);
        }
    }
};

module.exports = {validationConfig};
