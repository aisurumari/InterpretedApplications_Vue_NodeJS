const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName: {type:String, requred:true},
});

module.exports = mongoose.model("Category", categorySchema);