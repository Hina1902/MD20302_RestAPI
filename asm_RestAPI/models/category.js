const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    CateID: String,
    CateName: String
});

module.exports = mongoose.model("category", categorySchema);
