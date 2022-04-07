const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type:String},
    description: {type:String},
    price: {type:Number},
    weight: {type:Number},
    category: {type:String, enum: ['tshirt', 'hat', 'jacket']}
});

module.exports = mongoose.model("Product", productSchema);