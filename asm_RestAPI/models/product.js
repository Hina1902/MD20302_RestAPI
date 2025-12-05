const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    ProductID: String,
    ProductName: String,
    Description: String,
    Price: Number,
    CateID: String
});

module.exports = mongoose.model("product", productSchema);
