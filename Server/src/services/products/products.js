const { productValidation } = require('../../helpers/validation/productValidation/productValidation');
const { validationConfig } = require('../../helpers/validation/productValidation/validationConfig');
const {  logger, logwarn, logerror } = require('../../helpers/logger');

const productServices = ({ productsDao }) => {
    if (!productsDao) {
        throw new Error('Products DAO dependency is required');
    }
    const findProductById = async (id) => {
        if (!id) return validationConfig.formatResponse(false, 'Product ID is required');
        const product = await productsDao.listById(id);
        return product ? validationConfig.formatResponse(true, 'Product found', product) : validationConfig.formatResponse(false, 'Product not found');
    };

    return {
        listProducts: async () => {
            try {
                const products = await productsDao.getProducts();
                return validationConfig.formatResponse(true, 'Products retrieved successfully', products);
            } catch (error) {
                logerror.error(error.message);
                return validationConfig.formatResponse(false, error.message);
            }
        },

        saveProduct: async (data, ...photos) => {
            try {
                if (!data.photos || !Array.isArray(data.photos) || data.photos.length === 0) {
                    data.photos = Array.isArray(photos[0]) ? photos.flat() : photos;
                }
        
                // console.log("Final Product Data Before Saving:", JSON.stringify(data, null, 2));
        
                if (!validationConfig || !validationConfig.formatResponse) {
                    throw new Error('Validation configuration not properly initialized');
                }
        
                const { error } = productValidation.createProduct().validate(data);
                if (error) {
                    return validationConfig.formatResponse(false, error.details[0].message);
                }
        
                const validation = await validationConfig.validateProduct(productsDao, data);
                if (!validation.success) {
                    return validation;
                }
        
                // console.log("Saving product with data:", JSON.stringify(data, null, 2));
        
                const product = await productsDao.saveProducts(data);
        
                // console.log("Product saved successfully:", product);
                return validationConfig.formatResponse(true, 'Product created successfully', product);
            } catch (error) {
                logerror.error("Error saving product:", error.message);
                return validationConfig.formatResponse(false, error.message);
            }
        },
        
        

        updateAfterBuy: async (data) => {
            try {
                const { error } = productValidation.updateStock().validate(data);
                if (error) return validationConfig.formatResponse(false, error.details[0].message);

                const productResult = await findProductById(data.id);
                if (!productResult.success) return productResult;

                const stockValidation = validationConfig.validateStockAvailability(
                    productResult.data.stock, data.count
                );
                if (!stockValidation.success) return stockValidation;

                const result = await productsDao.updateAfterBuy(data);
                return validationConfig.formatResponse(true, 'Stock updated successfully', result);
            } catch (error) {
                logerror.error(error.message);
                return validationConfig.formatResponse(false, error.message);
            }
        },

        deleteById: async (id) => {
            try {
                const productResult = await findProductById(id);
                if (!productResult.success) return productResult;

                const result = await productsDao.deleteById(id);
                return validationConfig.formatResponse(true, 'Product deleted successfully', result);
            } catch (error) {
                logerror.error(error.message);
                return validationConfig.formatResponse(false, error.message);
            }
        },

        listById: async (id) => findProductById(id),

        listByCategory: async (category) => {
            try {
                if (!category) return validationConfig.formatResponse(false, 'Category is required');

                const products = await productsDao.listByCategory(category);
                return validationConfig.formatResponse(true, 'Products retrieved successfully', products);
            } catch (error) {
                logerror.error(error.message);
                return validationConfig.formatResponse(false, error.message);
            }
        }
    };
};



module.exports = productServices;