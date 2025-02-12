const { productService } = require('../../services/index');
const { productValidation } = require('../../helpers/validation/productValidation/productValidation');
const handlePhotoUpload = require('../../helpers/photoHandlers/photoHandler');
const { logger, logwarn, logerror } = require('../../helpers/logger');

const productsController = () => {
    return {
        listProducts: async (req, res) => {
            try {
                const response = await productService.listProducts();
                logger.info('Fetched all products successfully');
                res.status(response.status).json(response);
            } catch (error) {
                logerror.error(`Error fetching products: ${error.message}`); 
                res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
            }
        },

        
        saveProducts: async (req, res) => {
            try {
                if (!productService?.saveProduct) {
                    logerror.error('Product service not properly initialized');
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Service configuration error', 
                        data: null 
                    });
                }
        
                const { error } = productValidation.createProduct().validate(req.body);
                if (error) {
                    logwarn.warn(`Product validation failed: ${error.details[0].message}`);
                    return res.status(400).json({ 
                        success: false, 
                        message: error.details[0].message, 
                        data: null 
                    });
                }
        
                const uploadedPhotos = await handlePhotoUpload(req.files);
                // console.log("Uploaded Photos:", uploadedPhotos);
                
        
                if (!uploadedPhotos.length) {
                    logwarn.warn(`No photos uploaded for product`);
                    return res.status(400).json({
                        success: false,
                        message: "At least one photo is required",
                        data: null
                    });
                }
        
                const response = await productService.saveProduct(req.body, uploadedPhotos.flat());
                if (response.success) {
                    logger.info(`Product created successfully: ${response.data._id}`);
                } else {
                    logwarn.warn(`Failed to create product: ${response.message}`);
                }
        
                res.status(response.success ? 200 : 400).json(response);
            } catch (error) {
                logerror.error(`Error saving product: ${error.message}`);
                res.status(500).json({ 
                    success: false, 
                    message: 'Internal Server Error', 
                    data: null 
                });
            }
        },

        updateById: async (req, res) => {
            try {
                const { id } = req.params;

                if (!id) {
                    logwarn.warn('Update failed: Product ID is required'); 
                    return res.status(400).json({ success: false, message: 'Product ID is required', data: null });
                }

                const { error } = productValidation.updateProduct().validate(req.body);
                if (error) {
                    logwarn.warn(`Product update validation failed: ${error.details[0].message}`); 
                    return res.status(400).json({ success: false, message: error.details[0].message, data: null });
                }

                const uploadedPhotos = await handlePhotoUpload(req.files);

                if (req.body.deletePhotos && Array.isArray(req.body.deletePhotos)) {
                    await Promise.all(req.body.deletePhotos.map(photoId => destroy(photoId)));
                }

                const response = await productService.updateById(id, req.body, uploadedPhotos);
                if (response.success) {
                    logger.info(`Product updated successfully: ${id}`);
                } else {
                    logwarn.warn(`Failed to update product ${id}: ${response.message}`); 
                }

                res.status(response.success ? 200 : 400).json(response);
            } catch (error) {
                logerror.error(`Error updating product ${req.params.id}: ${error.message}`); 
                res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
            }
        },

        deleteById: async (req, res) => {
            try {
                const { id } = req.params;

                if (!id) {
                    logwarn.warn('Delete failed: Product ID is required'); 
                    return res.status(400).json({ success: false, message: 'Product ID is required', data: null });
                }

                const product = await productService.listById(id);
                if (!product.success) {
                    logwarn.warn(`Delete failed: Product ${id} not found`); 
                    return res.status(404).json({ success: false, message: 'Product not found', data: product });
                }

                const response = await productService.deleteById(id);
                if (response.success) {
                    logger.info(`Product deleted successfully: ${id}`);
                    if (product.data.photos) {
                        await Promise.all(product.data.photos.map(photo => destroy(photo.id)));
                    }
                } else {
                    logwarn.warn(`Failed to delete product ${id}: ${response.message}`); 
                }

                res.status(response.success ? 200 : 400).json(response);
            } catch (error) {
                logerror.error(`Error deleting product ${req.params.id}: ${error.message}`); 
                res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
            }
        },

        listById: async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    logwarn.warn('Fetch failed: Product ID is required'); 
                    return res.status(400).json({ success: false, message: 'Product ID is required', data: null });
                }

                const response = await productService.listById(id);
                if (response.success) {
                    logger.info(`Fetched product successfully: ${id}`);
                } else {
                    logwarn.warn(`Product ${id} not found`); 
                }

                res.status(response.success ? 200 : 400).json(response);
            } catch (error) {
                logerror.error(`Error fetching product ${req.params.id}: ${error.message}`); 
                res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
            }
        },

        listByCategory: async (req, res) => {
            try {
                const { id: category } = req.params;
                if (!category) {
                    logwarn.warn('Fetch failed: Category is required'); 
                    return res.status(400).json({ success: false, message: 'Category is required', data: null });
                }

                const response = await productService.listByCategory(category);
                logger.info(`Fetched products for category: ${category}`);

                res.status(response.success ? 200 : 400).json(response);
            } catch (error) {
                logerror.error(`Error fetching products for category ${req.params.id}: ${error.message}`); 
                res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
            }
        }
    };
};

module.exports = productsController;
