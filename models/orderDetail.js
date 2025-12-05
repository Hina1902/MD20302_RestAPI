const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderDetailSchema = new Schema({
    orderID: { type: ObjectId, ref: 'order' },
    productID: { type: ObjectId, ref: 'product' },
    quantity: { type: Number },
    price: { type: Number }
});

module.exports = mongoose.model('orderDetail', orderDetailSchema);
