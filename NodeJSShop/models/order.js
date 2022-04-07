const mongoose = require("mongoose")

const orderNumberSchema = new mongoose.Schema({
    name: {type:String},
    number: {type:Number, default:1, min:1}
});

const orderSchema = new mongoose.Schema({
    acceptance_date: {type:Date, default: Date.now()},
    order_state: {type: String, default:'NOT_ACCEPTED'},
    username: {type:String},
    email: {type:String},
    phone: {
        type:Number
    },
    order_number: {type:orderNumberSchema}
});

module.exports = mongoose.model("Order", orderSchema);