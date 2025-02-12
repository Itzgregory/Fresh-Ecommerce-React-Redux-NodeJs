const orderDao = (model) => {
    const { orderModel } = model
    return {
        saveOrder: async (Order, user) => {
            const order = new orderModel({
                buyer: user.username,
                total: Order.reduce((totalAcum, { total }) => totalAcum + total, 0),
                items: Order,
                date: new Date().toLocaleString(),
                email: user.email
            })
            return await order.save()
        },
        listAllOrder: async (user) => {
            try {
                if (user.username === "Admin") {
                    return await orderModel.find({}).lean();
                } else {
                    return await orderModel.find({ buyer: user.username }).lean();
                }
            } catch (err) {
                return "Something was wrong in the queres", err
            }
        },

        listOrderById: async (id) => {
            try {
                const productoid = await orderModel.find({ _id: id }).lean()
                return productoid
            } catch {
                return false
            }
        },
        deleteOrderById: async (id) => {
            try {
                await orderModel.deleteOne({ idOrder: id })
                return true
            } catch (err) {
                throw new Error(`something go wrong ${err}`)
            }
        },
        updateOrder: async (id, data) => {
            const orderUpdate = await orderModel.findById(id)
            orderUpdate.status = data
            return await orderUpdate.save()                            
        },
        deleteAllOrder: async () => {
            try {
                await orderModel.deleteMany({});
                return true
            } catch (err) {
                throw new Error(`something go wrong ${err}`)
            }
        }
    }
}

module.exports = orderDao