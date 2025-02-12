const { logger } = require("../../helpers/logger")

const cartControllers = (service) => {
    const { cartServices, productService } = service
    return {
        cartList: async (req, res) => {
            const username = req.user?.username
            try{
                const list = await cartServices.cartList(username)
                res.status(200).send(list)
            }catch(err){
               logger.error("an error occurred during the transaction") 
            }          
        },
        saveCart: async (req, res) => {
            const data = req.body
            const user = req.user
            await productService.updateAfterBuy({ id: data._id, count: data.count })
            const product = await cartServices.saveOrUpdateCart(data, user)
            res.status(200).send(product)
        },

        updateProductCart: async (req, res) => {
            const data = req.body  
             await productService.updateAfterBuy({ id: data.idProduct, count: (data.Qty - data.originalQty) })
            const productUpdate = await cartServices.updateProductCart({ id: data.idProduct, Qty: data.Qty, price: data.price })
            res.status(200).send(productUpdate)
         },

        deleteProductCart: async (req, res) => {
            const data = req.body
            await productService.updateAfterBuy({ id: data.idProduct, count: -data.Qty })
            const queryDelete = await cartServices.deleteProductCart(data._id)
            res.status(200).send(queryDelete)
        },
        deleteAllProductsCart: async (req, res) => {
            const username = req.params.id
            const query = await cartServices.deleteAllProductsCart(username)
            res.status(200).send(query)
        }
    }
}

module.exports = cartControllers