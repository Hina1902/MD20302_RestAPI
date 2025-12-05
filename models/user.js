const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    role: { type: String },
    status: { type: Boolean }
});

module.exports = mongoose.model('user', userSchema);
