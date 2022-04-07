const mongoose = require("mongoose")

const orderStateSchema = new mongoose.Schema({
    orderStateName: {type:String, requred:true},
});

module.exports = mongoose.model("Order state", orderStateSchema);