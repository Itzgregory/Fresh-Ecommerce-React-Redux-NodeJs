const { Schema, model } = require('mongoose')

const schemaProducts = new Schema({
    timeStamp: {type: String, required:true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    category: {type:String, required: true},
    photos: [
        {
            url: { type: String, required: true },
            id: { type: String, required: true }
        }
    ],
    price: {type:Number, required: true},
    stock: {type:Number, required: true}
},{
    versionKey: false,
})

module.exports = model('products', schemaProducts)