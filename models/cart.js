const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
    userID: { type: ObjectId, ref: 'user' },
    productID: { type: ObjectId, ref: 'product' },
    quantity: { type: Number },
    updateAt: { type: Date }
});

module.exports = mongoose.model('cart', cartSchema);
