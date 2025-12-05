const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    BillID: String,
    Date: { type: Date, default: Date.now },
    Email: String
});

module.exports = mongoose.model("bill", billSchema);
