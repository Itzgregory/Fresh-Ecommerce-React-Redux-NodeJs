const ordersControllers = (service, sendMail) => {
    const { orderServices, cartServices } = service
    return {
        saveOrder: async (req, res) => {
            const data = req.body
            const user = req.user
            const order = await orderServices.saveOrder(data, user)
            await sendMail(order)
            try {
                const deleteCart = await cartServices.deleteAllProductsCart(user.username)
                res.status(200).send(deleteCart)
            } catch {
                res.status(404).send(false)
            }
        },
        listAllOrder: async (req, res) => {
            const user = req.user

            try {
                const list = await orderServices.listAllOrder(user)
                res.status(200).send(list)
            } catch (err) {
                res.status(400).send(`something go wrong! ${err}`)
            }
        },
        listOrderById: async (req, res) => {
            try {
                const id = req.params.id
                const listById = await orderServices.listOrderById(id)
                res.status(200).send(listById)
            } catch (err) {
                res.status(400).send(`something go wrong! ${err}`)
            }
        },
        deleteAllOrder: async (req, res) => {
            await orderServices.deleteAllOrder()
            res.status(200).send("All orders was deleted")
        },
        updateOrder: async (req, res) => {
            const id = req.params.id
            const data = req.body
            const query = await orderServices.updateOrder(id, data.status)
            res.status(200).send(query)

        },
        deleteOrderById: async (req, res) => {
            const id = req.params.id
            await orderServices.deleteOrderById(id)
            res.status(200).send("The order was deleted")

        }
    }
}

module.exports = ordersControllers