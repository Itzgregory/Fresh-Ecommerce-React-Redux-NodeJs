const {  logger, logwarn, logerror } = require('../../../helpers/logger');

const productsDao = (model) => {
    const { productsModel } = model;

    return {
        async getProducts() {
            try {
                const products = await productsModel.find({}).lean();
                logger.info('Fetched all products successfully');
                return products;
            } catch (error) {
                logerror.error(`Failed to fetch products: ${error.message}`);
                throw new Error('Failed to fetch products');
            }
        },

        async findByCode(code) {
            try {
                if (!code) {
                    logwarn.warn('Product code is required but was not provided');
                    throw new Error('Product code is required');
                }
                const product = await productsModel.findOne({ code }).lean();
                if (!product) {
                    logwarn.warn(`Product with code ${code} not found`);
                    return null;
                }
                logger.info(`Fetched product by code successfully: ${code}`);
                return product;
            } catch (error) {
                logerror.error(`Failed to fetch product by code: ${error.message}`);
                throw new Error('Failed to fetch product by code');
            }
        },

      async saveProducts(data) {
            try {
                const photoObjects = (data.photos || []).map(photo => ({
                    url: photo.url,
                    id: photo.id
                }));

                const product = new productsModel({
                    timeStamp: Date.now(),
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    category: data.category,
                    photos: photoObjects,  
                    price: data.price,
                    stock: data.stock
                });

                const savedProduct = await product.save();
                logger.info(`Created product successfully: ${savedProduct._id}`);
                return savedProduct;
            } catch (error) {
                logerror.error(`Failed to save product: ${error.message}`);
                throw new Error('Failed to save product');
            }
        },

        async updateById(id, data, ...photos) {
            try {
                const photoObjects = photos.filter(Boolean).map((photo) => ({
                    url: photo.url,
                    id: photo.id
                }));

                const result = await productsModel.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            name: data.name,
                            description: data.description,
                            code: data.code,
                            category: data.category,
                            photos: photoObjects,
                            price: data.price,
                            stock: data.stock
                        }
                    },
                    { new: true }
                );

                if (!result) {
                    logwarn(`Attempted to update non-existing product: ${id}`);
                    throw new Error('Product not found');
                }

                logger.info(`Updated product successfully: ${id}`);
                return result;
            } catch (error) {
                logerror.error(`Failed to update product: ${error.message}`);
                throw new Error('Failed to update product');
            }
        },

        async updateAfterBuy(data) {
            try {
                const result = await productsModel.findByIdAndUpdate(
                    data.id,
                    { $inc: { stock: -data.count } },
                    { new: true }
                );

                if (!result) {
                    logwarn(`Stock update failed: Product not found (${data.id})`);
                    throw new Error('Product not found');
                }

                logger.info(`Updated stock for product ${data.id}, reduced by ${data.count}`);
                return result;
            } catch (error) {
                logerror.error(`Failed to update product stock: ${error.message}`);
                throw new Error('Failed to update product stock');
            }
        },

        async deleteById(id) {
            try {
                const result = await productsModel.findByIdAndDelete(id);

                if (!result) {
                    logwarn(`Attempted to delete non-existing product: ${id}`);
                    throw new Error('Product not found');
                }

                logger.info(`Deleted product successfully: ${id}`);
                return result;
            } catch (error) {
                logerror.error(`Failed to delete product: ${error.message}`);
                throw new Error('Failed to delete product');
            }
        },

        async listById(id) {
            try {
                const product = await productsModel.findById(id).lean();

                if (!product) {
                    logwarn(`Product not found: ${id}`);
                    throw new Error('Product not found');
                }

                logger.info(`Fetched product successfully: ${id}`);
                return product;
            } catch (error) {
                logerror.error(`Failed to fetch product: ${error.message}`);
                throw new Error('Failed to fetch product');
            }
        },

        async listByCategory(category) {
            try {
                const products = await productsModel.find({ category }).lean();
                logger.info(`Fetched products for category: ${category}`);
                return products;
            } catch (error) {
                logerror.error(`Failed to fetch products by category: ${error.message}`);
                throw new Error('Failed to fetch products by category');
            }
        }
    };
};

module.exports = productsDao;
