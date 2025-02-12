const { logerror } = require("../../../helpers/logger")
const cartDao = (model) => {
    const { cartModel } = model
    try {
        return {
            cartList: async (username) => {
                const listCart = await cartModel.find({ username: username })         
                return listCart               
            },
            //This function try to find and update a product. If doesn't find, create a new with the values in data parameter//
            saveOrUpdateCart: async (data, user) => {
                return await cartModel.findOneAndUpdate({ idProduct: data._id }, {
                    username: user.username,
                    timestampProducto: data.timeStamp,
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    category: data.category,
                    photo: data.photo,
                    price: data.price,
                    $inc:
                    {
                        Qty: +data.count,
                        total: +(data.count  * data.price)
                    }
                }, {
                    new: true,
                    upsert: true
                })
           },
            deleteProductCart: async (id) => {
                let product = await cartModel.findByIdAndRemove({ _id: id })
                return product
            },
            deleteAllProductsCart: async (username) => {
                return await cartModel.deleteMany({ username: username });                
            },
            listById: async (id, username) => {
                const productById = await cartModel.findOne({ $and: [{ idProduct: id }, { username: username }] }).lean()
                return productById
            },
            updateProductCart: async (data) => {
                return cartModel.findOneAndUpdate({ idProduct: data.id }, {
                    Qty: data.Qty,
                    total: data.Qty*data.price
                },
                    {
                        new: true,
                        upsert: false
                    })
            }
        }
    } catch (err) {
        logerror.error(`something go wrong ${err}`);
    }
}



module.exports = cartDao