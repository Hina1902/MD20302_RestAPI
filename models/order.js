const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    userID: { type: ObjectId, ref: 'user' },
    fullName: { type: String },
    address: { type: String },
    status: { type: String },
    paymentMethod: { type: String },
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', orderSchema);
