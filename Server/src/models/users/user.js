const mongoose = require('mongoose');

const schemaUser =  new mongoose.Schema({
    name: {type: String, required: true, lowercase: true,},
    surname: {type: String, required: true, lowercase: true,},
    phone: {type: String, required: false},      
    username: { type: String, required: true,  lowercase: true,},
    password: { type: String, required: true},
    photo: {type: String, required: false},
    email: {type: String, required: true,  lowercase: true,},
    tokens: [{ type: String }],
    lastLogin: { type: Date },
    role: {type: String, default: 'user'},
}, { timestamps: true });

module.exports = mongoose.model('user', schemaUser);

