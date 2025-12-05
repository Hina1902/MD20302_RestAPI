const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    Email: String,
    Password: String,
    FullName: String
});

module.exports = mongoose.model("account", accountSchema);
