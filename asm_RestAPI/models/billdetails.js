const mongoose = require("mongoose");

const billDetailsSchema = new mongoose.Schema({
    BillID: String,
    ProductID: String,
    Quantity: Number
});

module.exports = mongoose.model("billdetails", billDetailsSchema);
