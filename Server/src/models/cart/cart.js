const { Schema, model } = require('mongoose') 

const schemaCart = new Schema({
    username: { type: String, require: true, max:100},
    idProduct: { type: String, require: true, max: 100000 },
    timestampProducto: { type: String, require: true, max: 10000 },
    name: { type: String, require: true, max: 100000 },
    description: { type: String, require: true, max: 100000 },
    code: { type: String, require: true, max: 100000 },
    category: { type: String, require: true, max: 100000 },      
    photo: {type:String},
    price: { type: Number, require: true},
    Qty: { type: Number, require: true},
    total: { type: Number, require: true}    
},{
    versionKey: false,
})

module.exports = model('cart', schemaCart);