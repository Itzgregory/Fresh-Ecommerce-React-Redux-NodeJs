const { Schema, model  } = require('mongoose')

const schemaOrders = new Schema({
    buyer: { type: String, require: true },
    total: {type: Number, require: true},
    items: { type: Array, default: []},
    date: { type: String, require: true },
    email: { type: String, require: true },
    status: { type: String, require: true, default: "generated"}
},{
    versionKey: false
})

module.exports = model('orders', schemaOrders) 
